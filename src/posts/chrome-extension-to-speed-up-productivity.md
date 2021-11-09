---
title: "前端高效工作工具篇：用 chrome 插件高效管理输入源"
date: "2021-08-01"
tags: ["chrome", "tools"]
---

前面一篇介绍 [Vimium](https://juejin.cn/post/7027992551235813412)
插件的文章中有提到，前端开发每天工作逃不开编辑器和浏览器。在介绍完
[Vim](https://juejin.cn/post/7027693986768748575)之后，顺着 Vimium 插件，今天继续推荐一些可以提高生产力的 chrome
插件。"前端高效工作"系列后面几篇文章会介绍 Chrome 插件开发、Chrome Devtool
相关功能使用（lighthouse、performance），欢迎关注[专栏](https://juejin.cn/column/7027695237325651998)。

言归正传，Chrome 插件市场有大量的扩展可选，也有大量的文章帮我们整理了好用的插件，比如：[The Best
Free Google Chrome
Extensions](https://www.pcmag.com/news/the-100-best-free-google-chrome-extensions)，介绍了2021年最新的100个值得一用的插件。不过每个人的需求不一样，你并不需要所有这些插件。所以这篇文章会围绕“高效管理输入源”这个主题推荐我自己有在用的一些插件，并且会顺带介绍插件“背后”的那些应用。


### 高效管理输入源

作为开发，我们每天都会在浏览器中阅读大量的文章，有些需要收藏，有些需要集中到一个地方稍后阅读，有些在阅读完后需要分门别类打上标签存档，方便日后检索。那有哪些应用以及它提供的
Chrome 插件可以帮我们来处理输入，使我们能更有条理地组织知识和信息？有很多，比如
Evernote、Onenote、有道云笔记等等，不过我今天推荐的是 [Google Keep](https://keep.google.com/)
、[Pocket](https://getpocket.com/)，以及 [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall)。


#### Google Keep

首先介绍 Google Keep，这个 Keep 不是我们健身爱好者经常用的 Keep，它是 Google
推出的一个记事软件，虽然我觉得它很好用（满足了我的使用场景），但可能因为它产品本身定位并不够清晰，所以貌似没有特别火，身边使用的人并不多。它除了提供网页版外，也提供移动端
App，可以在多端做同步。它的核心功能是记事。可以使用文本、图片、绘图、TODO List
的方式记录，但我只使用它来保存网页（准确说是网页文章），并对这些文章按主题做分类，也可以通过标注颜色对文章的价值（对我而言）做分级。以下是我的 Google Keep 的截图（注意 `Vim` 等标签以及醒目的背景标红）：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/chrome-extension/1.jpeg)

使用Keep，让我可以把阅读过的大量文章分门别类收藏并标记对我而言的价值等级，方便日后检索。它的搜索功能非常好用（毕竟是 Google 的产品），可以根据标签（主题）、类型（列表、图片、网址）、颜色等进行搜索，当然也支持文本的模糊搜索，方便在成百上千的收藏中快速定位到自己想阅读或再次阅读的文章，搜索主页如下：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/chrome-extension/2.jpeg)

可以在 Chrome 插件市场安装 [Keep 的 Chrome 插件](https://chrome.google.com/webstore/detail/google-keep-chrome-extens/lpcaedmchfhocbbapmcbpinfpgnhiddi?hl=zh-CN)。安装完成后在任意网页点击 Google Keep 对应的插件图标即可收藏当前的网页文章，并且可以添加注解（记事）以及打标签。如下所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/chrome-extension/3.png)

相信你在尝试使用后，会喜欢上这款应用以及它的 chrome 插件。

#### Pocket

Google Keep
也有它的不足，它在手机端的阅读体验并不够好，所以我一般只用它来保存在桌面端阅读后需要收藏的文章。但很多时候，你可能没时间在桌面端阅读完文章，或者你就喜欢用手机阅读，那么使用 Pocket 就是更好的选择。Pocket 是一个文章收藏工具，也支持多端同步。相比于 Google Keep，它有更好的手机端阅读体验，所以我一般把它定位成一个临时收藏夹，把近期要看的一些文章都收藏到里面，这样上下班、各种排队时间、甚至于上厕所都可以阅读自己想看的文章，对于好文章，读完可以用它的存档功能保存，同时也支持打标签。但我觉得它的标签功能并不如 Google Keep 好用，所以好的文章我还是会同步到 Google Keep 中做分类管理，保证我阅读过的好文章都能在同一个地方检索到。

Pocket 的应用以及对应的 Chrome 插件如何下载安装这里不赘言，你分分钟能搞定。插件使用方式和 Google
Keep 类似，你可以下载它的桌面客户端、手机 App、或者可以用网页浏览。

如果你没用过，强烈建议试一试，也许会帮你每天提高 10% 的阅读输入量。


#### OneTab

这是一个单纯的 Chrome [插件](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall)。它解决什么问题呢？对于很多学习爱好者，经常会打开十几个甚至几十个网页，但你根本阅读不过来，这些打开的网页文章你又想晚点再读，不想关掉从此两茫茫，也不想一个个去保存收藏。这个时候 OneTab 就派上用场了。你可以一键将所有这些 tab 保存成一个列表，留着下次再阅读。如何安装使用这里也不再赘言，因为对你而言太简单了。下面是我的 OneTab 页面：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/chrome-extension/4.png)


### 结语

以上是我几乎每天都有在用的用来管理输入源的工具。当然你可能会使用其他的类似工具，但工具只是一部分，我们应该更多地依赖系统。我认为每个开发都应该利用一些工具打造自己的输入输出系统，通过系统来确保自己能持续学习、持续输出。如果你有其他好的工具推荐，欢迎在评论中留言分享。