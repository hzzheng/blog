---
title: "为什么 Flutter 选择了 Dart 语言"
date: "2020-07-08"
tags: ["flutter"]
origin: "https://medium.com/hackernoon/why-flutter-uses-dart-dd635a054ebf"
---

很多语言学家认为人们说的自然语言会影响思考本身。这种想法同样适用于计算机语言吗？使用不同编程语言的程序员针对相同问题往往会想出截然不同的解决方案。举个极端的例子，计算机科学家为了鼓励大家写出更具结构化的程序而去除了 goto 语句（并不完全像小说 1984 中极权主义者故意从自然语言中抹去异端词汇来消灭思想罪，不过也大差不离啦）。

但这跟 Flutter 和 Dart 有什么关联呢？实际上相当有关系。早期的 Flutter 团队评估了不下十余种语言，最后选择 Dart 是因为它最适合他们构建用户界面的方式。

Dart 是很多开发者喜欢 Flutter 的一个重要原因。就像这条推说的：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/why-flutter-uses-dart/WechatIMG1.png)

下面是一个 Dart 特性的快速查阅清单，所有这些特性一起让 Dart 之于 Flutter 变得不可或缺。

- Dart 支持 AOT （Ahead Of Time）编译，生成执行快、可预测的机器码。这使得几乎所有的 Flutter 组成都能用 Dart 来实现。这不仅使 Flutter 执行很快，实际上也使所有东西（包括所有 widgets）都能被定制。

- Dart 同时也支持 JIT （Just In Time）编译，这极大加快了开发流程，甚至可以说带了颠覆性的工作流（包括 Flutter 广受欢迎的次秒级维持状态的热更新）。

- Dart 使写出 60fps 流畅运行的动画变得简单。Dart 还能做对象内存分配和垃圾回收，并且不用锁。并且就像 Javascript 一样，Dart 避免了抢占式任务调度和内存共享（也因此避免了锁）。因为 Flutter 应用会被编译成机器码，所以它们不需要低效率的桥来沟通不同的领域（比如，Javascript 到 native）。

- Dart 让 Flutter 不需要一种分离的声明式布局语言比如 JSX 或者 XML，也不需要分离的视觉界面构建器，因为 Dart 声明式、可编程的布局更容易阅读和视觉化。并且由于所有的布局都用一种语言写在同一个地方，使得 Flutter 更容易提供高级的工具让布局变得小菜一碟。

- 开发者也已经发现 Dart 特别容易学习，因为它包含的特性对于无论是动态语言还是静态语言用户都很熟悉。

并不是所有这些特性都是 Dart 独有的，但这些特性的组合产生的奇妙化学反应让 Dart 成为实现 Flutter 独一无二的强大存在。以至于，你很难想象如果没有 Dart 的话，Flutter 是否还能如此强大。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/why-flutter-uses-dart/1_bAUFoOPQ3gcv7y4Kdz82tw.png)

这篇文章剩余的部分会更深入解释那些让 Dart 成为实现 Flutter 最好的语言的特性（包括它的标准库）。

### 编译和执行

（如果你熟悉静态语言/动态语言，AOT/JIT 编译，虚拟机等，你可以跳过这部分。）

