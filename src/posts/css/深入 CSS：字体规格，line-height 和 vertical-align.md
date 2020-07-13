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

