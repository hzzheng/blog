---
title: "Node.js 学习路线图"
date: "2017-06-02"
tags: ["node"]
---

根据饿了么的[node-interview](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/README.md)按主题整理了node学习资料，方便日后按图索骥，检索学习。

## 1. Javascript 基础问题
- 类型判断，推荐阅读[lodash](https://lodash.com/)源码，建议学习[Typescript](http://www.typescriptlang.org/)。
- 作用域，推荐阅读[你不知道的Javascript](https://book.douban.com/subject/26351021/)。
- 引用传递，还是传递引用，和指针的区别是什么，推荐阅读[is-javascript-a-pass-by-reference-or-pass-by-value-language](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)。
- 内存释放，需要了解V8的GC，了解哪些情况可能会导致内存泄漏。推荐阅读[《如何分析 Node.js 中的内存泄漏》](https://zhuanlan.zhihu.com/p/25736931)，以及[《深入浅出Node.js》](https://book.douban.com/subject/25768396/)的相关章节。
- ES6+新特性。深入理解ES6，推荐阅读阮一峰的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)，或者红宝书作者的[Understanding ECMAScript 6](https://leanpub.com/understandinges6/read#leanpub-auto-introduction)。

## 2. 模块
- 模块机制，先阅读[官方文档](https://nodejs.org/docs/latest-v8.x/api/modules.html)。深入理解[CommonJS](http://javascript.ruanyifeng.com/nodejs/module.html)规范。
- 热更新，理解require.cache，以及清空cache的问题。是否应该将可变的数据存到数据库？
- 上下文，一般情况只有一个上下文，可以使用vm模块在一个沙盒环境运行js避免上下文被污染。参考[VM官方文档](https://nodejs.org/docs/latest-v8.x/api/vm.html)。
- 包管理，深入理解npm，yarn，语义化版本等。参考[npm官方文档](https://docs.npmjs.com/)。

## 3. 事件/异步
- Promise。理解Promise的一些细节，比如then第二个参数和catch的区别，参考[We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)。理解Promise的[实现](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)。
- Events。理解[events](https://nodejs.org/dist/latest-v10.x/docs/api/events.html)核心模块。理解Stream基于Events实现，而fs，net，http等模块都依赖Stream。
- Timers。理解nextTick、setTimeout以及setImmediate三者的[区别](https://cnodejs.org/topic/5556efce7cabb7b45ee6bcac)。深入理解[Event Loop](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)。官方文档[The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)。Jake Archibald的文章[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)。
- 并行和并发。并发，2个队列对应1个咖啡机。并行，2个队列对应2个咖啡机。

## 4. 进程
- 关于进程以及操作系统，推荐阅读[《Unix环境高级编程》](https://book.douban.com/subject/1788421/)。
- 关于Node.js中的process对象，推荐看[官方文档](https://nodejs.org/dist/latest-v10.x/docs/api/process.html)。
- 配置。可以通过设置环境变量，或者使用dotenv等库读取配置文件。
- 标准流。熟悉process.stderr、process.stdout和process.stdin。
- child process。可以参考之前翻译过的[文章](https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a)，熟悉[child_process](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html)模块的用法。
- 理解[cluster](https://nodejs.org/dist/latest-v10.x/docs/api/cluster.html)模块。
- 理解IPC进程间通信。
- 理解守护进程的概念和[实现](https://cnodejs.org/topic/57adfadf476898b472247eac)。

## 5. IO
- Buffer是Node.js中用于处理二进制数据的类，与IO相关的操作均基于Buffer。[官方文档](https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html)。理解ES6的TypedArray。
- String Decoder。将Buffer转成string。
- Stream。可以参考之前翻译过的[文章](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)。
