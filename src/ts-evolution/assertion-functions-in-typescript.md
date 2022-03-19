---
title: "Typescript 中的断言函数"
date: "2022-02-19"
tags: ["ts-evolution"]
origin: "https://mariusschulz.com/blog/assertion-functions-in-typescript"
---

Typescript 3.9 在类型系统中实现了对断言函数的支持。断言函数是指当异常发生的时候会抛出错误的函数。通过使用断言签名，我们可以告诉 Typescript 某个函数应该被当做断言函数。


### 一个例子：document.getElementById() 方法

让我们来看一个例子，我们会用 `document.getElementById()` 方法来找到 id 为 `root` 的 DOM 元素：

```javascript
const root = document.getElementById("root");

root.addEventListener("click", e => {
  /* ... */
});
```

通过 `root.addEventListener`，我们给这个元素绑定了一个点击事件。然后，Typescript 会报一个类型错误：

```javascript
const root = document.getElementById("root");

// Object is possibly null
root.addEventListener("click", e => {
  /* ... */
});
```

`root` 变量的类型是 `HTMLElement | null`，这是为什么当我们试图调用 `root.addEventListener()` 的时候 Typescript 会报一个类型错误 "Object is possibly null"。为了能够让我们的程序类型正确，我们需要确保在调用 `root.addEventListener` 之前 `root` 变量不是 null 也不是 undefined。 我们有几种解决办法可选：

1. 使用非空断言 `!`
2. 在代码中判空
3. 实现断言函数

让我们分别来看这三种办法。

### 使用非空（Non-null）断言操作符

首先，我们尝试使用非空断言操作符 `!`，它作为后缀被添加到 `document.getElementById()` 方法调用后面：

```javascript
const root = document.getElementById("root")!;

root.addEventListener("click", e => {
  /* ... */
});
```

非空断言操作符 `!` 告诉 Typescript 可以假定 `document.getElementById()` 返回的值不是 null 也不是 undefined（也即非空的，non-nullish）。Typescript 会从我们添加了 `!` 的表达式返回值类型中去掉 `null` 和 `undefined` 类型。

在这个例子中，`document.getElementById()` 返回的类型是 `HTMLElement | null`，如果我们添加 `!` 操作符，我们得到的是 `HTMLElement` 类型。正如我们前面所见，Typescript 不再报类型错误。


然而，在这个场景中，使用非空操作符可能不是正确的解决办法。`! 操作符会在 Typescript 编译到 Javascript 的过程中被完全去除：

```javascript
const root = document.getElementById("root");

root.addEventListener("click", e => {
  /* ... */
});
```

非空操作符在运行时根本没有任何输出。也就是，Typescript 编译器不会生成判断表达式是否非空的任何验证代码。因此，假如 `document.getElementById()` 没有匹配到任何元素并返回 `null`，`root` 变量的值就是 `null`，那么尝试调用 `root.addEventListener()` 就会失败。

### 在代码中判空

现在让我们来考虑第二种解决办法，即在代码中判空来验证 `root` 变量的值是否是非空的：

```javascript
const root = document.getElementById("root");

if (root === null) {
  throw Error("Unable to find DOM element #root");
}

root.addEventListener("click", e => {
  /* ... */
});
```

因为我们的判空逻辑，Typescript 的类型检查器会将 `root` 变量的类型从 `HTMLElement | null`（判空前） 收窄为 `HTMLElement`(判空后)：

```javascript
const root = document.getElementById("root");

// Type: HTMLElement | null
root;

if (root === null) {
  throw Error("Unable to find DOM element #root");
}

// Type: HTMLElement
root;

root.addEventListener("click", e => {
  /* ... */
});
```

这个方法币之前的添加非空操作符的方式要安全得多了。我们会显式地去判断 `root` 变量是否为空，如果是空的则会抛出一个错误并且带上错误信息。

同时，我们发现这个方法没有带任何 Typescript 特有的语法。所有的都是合法的 Javascript 代码。Typescript [基于控制流的类型分析](https://juejin.cn/post/7026522261846769677)能够理解我们的空检查，并且将 `root` 变量的类型收窄 —— 不需要任何的类型标注信息。

### 实现断言函数