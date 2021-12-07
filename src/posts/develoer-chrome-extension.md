---
title: "前端高效工作工具篇：开发 Chrome 扩展"
date: "2021-08-08"
tags: ["chrome", "tools"]
---

前面两篇文章有介绍能提高生产力的 Chrome 插件（扩展）：[用 Chrome 插件高效管理输入源](https://juejin.cn/post/7028599657206906917)、[在 Chrome 中使用 Vim](https://juejin.cn/post/7027992551235813412)。在实际工作中我们可能也会遇到需要自己开发 Chrome 扩展的需求。比如典型的场景是用 Chrome 扩展聚合公司内部会用到的一些网站和工具，又或者通过 Chrome 扩展来增强 JIRA 等办公软件的能力，以此提高工作效率。

那怎么开发 Chrome 扩展？其实很简单，官方文档写得很清楚，有能力的同学可以直接点击下面的链接去阅读学习：

[Learn About developing extensions for Chrome](https://developer.chrome.com/docs/extensions/mv3/)。

也可以按照这个简单的教程文章一步一步开发一个自己的 Chrome 扩展：

[Best HTML、CSS、Javascript Practice: Chrome extension](https://thejungwon.medium.com/best-html-css-javascript-practice-chrome-extension-ae4e5e7839e)


不过如果你想快速对 Chrome 扩展有个更全貌的认识，可以继续阅读。


### 可以用 Chrome 扩展做什么

如果你去看了上面的资料，你会发现上手开发很容易。最简单的 Chrome 扩展，可以只需要一个 html 文件和一个 `manifest.json` 配置文件。当然，Chrome 提供了丰富的 API，比如可以通过 API 去控制 Chrome 的书签、历史记录、代理、标签页、浏览器主题外观、Cookie、Devtools 等，配合 `manifest.json` 配置，可以实现各种各样功能强大的 Chrome 扩展。
