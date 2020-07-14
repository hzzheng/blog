---
title: "深入理解CSS：字体规格，line-height 和 vertical-align"
date: "2020-07-13"
tags: ["css"]
origin: "https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align"
---

`line-height` 和 `vertical-align` 是简单的 CSS 属性。如此简单以至于我们大多数人都自信已经完全理解它们以及如何使用它们。但真的并非如此。它们真的很复杂，也许是最难以理解的属性，因为它们是某个很少为人所知的 CSS 特性——行内格式化上下文（inline formatting context）——的主要组成部分。

举个例子，`line-height` 可以被设置为一个具体的长度，或者无单位的值，不过它的默认值是 `normal`。但， `normal` 究竟是什么？我们经常会读到说它应该是1，或可能是1.2，但就连[ CSS 规范对于这一点也没有清晰的说明](https://www.w3.org/TR/CSS2/visudet.html#propdef-line-height)。我们知道无单位的 `line-height` 是相对 `font-size` 的，但问题是不同的字体族 `font-size: 100px` 的表现并不一致，所以 `line-height` 是永远相同还是不同的呢？它取值真的在1和1.2之间吗？然说说到 `vertical-align`，它对于 `line-height` 又意味着什么呢？

让我们一起来深入理解并不那么简单的 CSS 机制...

### 让我们先来谈一谈 `font-size`

看下面这个简单的 HTML 代码，一个 <p> 标签包含了3个 <span> 标签，并且每一个的 `font-family` 都不同：

```html
<p>
    <span class="a">Ba</span>
    <span class="b">Ba</span>
    <span class="c">Ba</span>
</p>
```

```css
p  { font-size: 100px }
.a { font-family: Helvetica }
.b { font-family: Gruppo    }
.c { font-family: Catamaran }
```

不同字体族即便设置相等的 `font-size`，它们的高度也是不同的：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/css-font-metrics-line-height-and-vertical-align%22/1.png)

<figcaption style="text-align: center; margin-top: -20px; color: #a6a6a6; padding-bottom: 20px;">
<i>1. 不同的字体族，相同的 font-size，得到不同的高度</i>
</figcaption>

现在我们知道了这个奇怪行为，但为什么 `font-size: 100px` 不能使得元素高 100px 呢？我测量了一下，发现他们的高度分别为：Helvetica: 115px，Gruppo: 97px，Gatamaran: 164px。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/css-font-metrics-line-height-and-vertical-align%22/2.png)

<figcaption style="text-align: center; margin-top: -20px; color: #a6a6a6; padding-bottom: 20px;">
<i>2. font-size: 100px 的元素高度从 97px 到 164px 不一</i>
</figcaption>

虽然乍看有点奇怪，但完全是符合预期的。原因在于字体本身。下面解释了原因：

- 一个字体定义了它的 [`em-square`](http://designwithfontforge.com/en-US/The_EM_Square.html)(也叫 UPM，units per em)，它代表一种容器，每个字符都在其中绘制。这个方形（square）使用相对单位，并且通常设置为 1000 单位。不过它也可能是 1024，2048 或其他数值。

- 基于这个相对单位，字体的规格被确定下来，包括 ascender（字体基线以上部分），descender（字体基线以下部分），capital height（大写字母高度），x-height（小写 x 高度）等。[注：这个几个术语以下文章都使用英文本身，不再翻译]

- 在浏览器中，相对单位会进行缩放来适应需要的字号。

以 Catamaran 字体为例，我们在 [FontForge](https://fontforge.org/en-US/) 中打开查看它的规格：

- `em-square` 是 1000
- ascender 是 1100，descender 是 540。经过一些测试发现，在 Mac OS 系统中，浏览器使用的是 HHead Ascent/Descent 值，而在 Windows 系统中，使用的是 Win Ascent/Descent 值（注意这些值可能是不一样的）。我们还注意到 Capital Height 是 680，X height 是 485。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/css-font-metrics-line-height-and-vertical-align%22/3.png)

<figcaption style="text-align: center; margin-top: -20px; color: #a6a6a6; padding-bottom: 20px;">
<i>3. FontForge 中显示的字体规格</i>
</figcaption>

这意味，基于 1000 单位的 `em-square`， Catamaran 字体使用了 1100 + 540 单位，当字号设为 `font-size: 100px` 的时候，它的高度就是 164px。这个计算后的高度（computed height）定义了元素的 content-area（内容区域，注：这个术语以下也不再翻译），我在文章的剩余部分都会使用这个术语。你可以认为这个 content-area 就是背景颜色应用的区域（并不完全准确）。

我们同样能得知大写字母高度是 68px (680 单位)，小写字母（x-height）是 49px（485 单位）。结果就是，1ex = 49px，1em = 100px，注意不是 164px（谢天谢地，`em` 是基于 `font-size` 的，而不是计算后的高度）。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/css-font-metrics-line-height-and-vertical-align%22/4.png)

<figcaption style="text-align: center; margin-top: -20px; color: #a6a6a6; padding-bottom: 20px;">
<i>4. Catamaran 字体：UPM —Units Per Em— 和基于 font-size: 100px 的像素值</i>
</figcaption>

再继续深入之前，需要先提及一下这个里面涉及的一个知识点。当一个 `<p>` 元素渲染在屏幕上的时候，它可以由许多行组成，这取决于它的宽度。每一行又由一个或多个行内元素（HTML 标签或者普通的文本内容）组成，被视为一个行盒（line-box）。行盒的高度取决于它的子元素的高度。浏览器会计算每一个行内元素的高度，然后得到行盒的高度（从它子元素的最高点到子元素的最低点）。结果是，一个行盒总是足够高以容纳它所有的子元素（默认情况）。

 > 每一个 HTML 元素其实都是一堆行盒。如果你知道了每一个行盒的高度，那么你就知道了这个元素的高度。

 如果像下面这样更新一下代码：

 ```html
 <p>
    Good design will be better.
    <span class="a">Ba</span>
    <span class="b">Ba</span>
    <span class="c">Ba</span>
    We get to make a consequence.
</p>
 ```

它会产生3个行盒：

- 第一个和最后一个包含了一个匿名的行内元素（文本呢绒）
- 第二个包含了两个匿名行内元素，以及三个 `<span>`

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/css-font-metrics-line-height-and-vertical-align%22/5.png)

<figcaption style="text-align: center; margin-top: -20px; color: #a6a6a6; padding-bottom: 20px;">
<i>5. 一个 p（黑色边框）元素由几个行盒（白色边框）组成，这些行盒又包含一些行内元素（实线边框）以及匿名行内元素（虚线边框）</i>
</figcaption>

我们可以清楚地看到第二个行盒比其他行盒都要高，这是由它子元素计算后的 content-area 高度决定的，或者更准确地说，由使用了 Catamaran 字体的那个元素决定。

行盒的难点在于我们肉眼看不到它，也没办法通过 CSS 来控制。即便给 `::first-line` 添加背景也没办法得到有关第一个行盒高度的任何视觉线索。


### `line-height`：面对问题以及更多