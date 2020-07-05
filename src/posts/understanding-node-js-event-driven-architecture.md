---
title: 理解 Node 的事件驱动架构
date: "2017-07-18"
origin: "https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/"
tags: ["node"]
---

大部分的Node对象，比如 HTTP的requests、responses 对象, 以及streams，都实现了 EventEmitter 模块，所以它们都提供了触发和监听事件的功能。

事件驱动的本质可以从Node.js一些常用函数的回调风格这种最简单形式中看出来。比如，`fs.readFile`函数，传入该函数的回调会被作为事件处理器，在适当的时候（Node.js 准备好调用这个回调的时候）被触发。

我们先从这种最简单的形式开始探索。

### Node，你准备好了就 Call 我吧

回调函数是 Node 处理异步事件最原始的形式，比很久之后Javascript才原生支持的 promise 和 async/await 要早很多。

回调函数简单说就是你传给其他函数的函数。这么做之所以可能，是因为函数在Javascript中是第一等对象。

有一点需要强调，回调并不意味异步，一个函数既可以同步也可以异步调用回调函数。

举个例子，这儿有个宿主函数 `fileSize` 接受一个回调参数 `cb`，并且会根据条件来同步或者异步调用这个回调。

```javascript
function fileSize (fileName, cb) {
  if (typeof fileName !== 'string') {
    return cb(new TypeError('argument should be string')); // Sync
  }
  fs.stat(fileName, (err, stats) => {
    if (err) { return cb(err); } // Async
    cb(null, stats.size); // Async
  });
}
```
注意这是糟糕的做法，会导致不可预料的错误。当我们设计宿主函数去调用回调的时候，记住要么永远同步，要么永远异步。

我们再来看一个典型的使用callback风格的异步函数：

```javascript
const readFileAsArray = function(file, cb) {
  fs.readFile(file, function(err, data) {
    if (err) {
      return cb(err);
    }
    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};
```
`readFileAsArray` 接收一个文件路径参数和一个回调参数。它会读取文件内容，并且按行分割放入一个数组中，然后调用回调函数并传入该数组。

以下是使用这个函数的一个例子。假设在相同的目录下有一个 `numbers.txt` 文件，其内容如下：

```javascript
10
11
12
13
14
15
```

如果我们要计算文件中奇数的数量，我们可以用 `readFileAsArray` 来简化代码：

```javascript
readFileAsArray('./numbers.txt', (err, lines) => {
  if (err) throw err;
  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter(n => n%2 === 1);
  console.log('Odd numbers count:', oddNumbers.length);
});
```

上面的代码首先从文件中读取内容获得一个字符串数组，然后将数组中的字符串转位数字并计算奇数个数。

这是不折不扣的 Node 回调风格。这个回调函数的第一个参数是 `err` 错误对象，`err` 可以为 null。并且回调函数本身又作为宿主函数的最后一个参数传入。你应该永远这样做，因为使用者很可能会这样去预期，也即，宿主函数接收回调作为最后一个参数，并且这个回调函数接收一个错误对象作为它的第一个参数。

### 现代 Javascript 中回调函数的替代品

在现代 Javascript 中，我们有了 promise 对象，它可以替代回调函数作为异步的API。与回调函数作为参数传入并且在同一个地方处理错误和正常流程不同，promise 对象允许我们分开处理两者，并且可以通过链式调用异步方法而不是嵌套他们。

如果 `readFileAsArray` 函数支持 promises，我们就可以向下面这样使用它：

```javascript
readFileAsArray('./numbers.txt')
  .then(lines => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(n => n%2 === 1);
    console.log('Odd numbers count:', oddNumbers.length);
  })
  .catch(console.error);
```

我们通过 `.then` 函数调用来处理宿主函数的返回值，而非传入一个回调函数。通过 `.then` 函数，我们可以像之前一样获取到 lines 数组，并且处理它。至于错误处理，我们可以通过 `.catch` 调用来访问到错误对象。

因为有了 `Promise` 构造函数，我们可以很容易地给宿主函数添加 promise 接口。下面的这个 `readFileAsArray` 即支持 promise 接口又支持回调风格的接口：

```javascript
const readFileAsArray = function(file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }
      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};
```

新的 `readFileAsArray` 函数返回了一个 promise 对象，并且 Promise 构造器暴露了 `resolve` 和 `reject`函数。

每当发生错误的时候，我们就调用 `reject` 函数，并传入 `err` 对象，每当执行正常需要传递数据的时候就调用 `resolve` 函数。

在上面的例子中，为了避免使用者通过 promise 的方式消费这个函数而导致报错，我们需要给回调参数一个默认值，也即一个空函数。

### 通过 async/await 来使用 promise

