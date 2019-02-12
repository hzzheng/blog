---
title: "轻松理解async函数"
date: "2017-04-09"
---

Async函数是ES2017规范的一部分。刚刚发布的Node7.6.0版本开始支持该语法，不用加flag也能运行。Chrome55版本之后以及大部分现代浏览器也都已经支持。对于不支持的浏览器和Node环境，可以通过Babel转译成ES3/ES5的语法运行。

### Async函数是什么

先看一个简单的例子：

```javascript
async function fetchPosts() {
  const URL = '/api/posts'
  try {
    const response = await fetch(URL)
    // ...
  } catch (rejectValue) {
    // ...
  }
}
```

上面的函数声明前加了async关键字，函数内部使用了await语法。简单说，async函数内部可以await一个promise，用同步的方式写异步的代码。在被await的promise完成之前，函数不会继续执行，但不会阻塞主线程。当promise完成后，如果是fulfill，返回的结果作为await表达式的值。如果是reject，reject的值被当做异常抛出。

上面的例子并不完整，为了能更好地理解async函数，下面分别用promise和async语法实现了相同的功能。

```javascript
// 实现请求文章列表 promise版本
function fetchPosts() {
  const URL = '/api/post'
  return fetch(URL)
    .then(res => res.json())
    .then(posts => {
      console.log(posts)
    })
    .catch(err => {
      console.error('fetch posts failed', err)
    })
}
```

```javascript
// 实现请求文章列表 async版本
async function fetchPosts() {
  try {
    const URL = '/api/post'
    const res = await fetch(URL)
    const posts = await res.json()
    console.log(posts)
  } catch (err) {
    console.error('fetch posts failed', err)
  }
}
```

### async函数的返回值

async函数永远返回一个promise。这个promise所resolve的是函数`return`的值。如果直接`return`一个promise，那async函数的返回值就是该promise。

如果async函数抛出异常，则返回的promise的状态是reject。

```javascript
async function normal() {
  return 'hello'
}

// return a promise resolved with 'hello'
const promiseResolvedWithHello = normal()
```

```javascript
async function error() {
  throw Error('oops...')
}

// return a promise rejected with Error('oops...')
const promiseRejectedWithError = error()
```

### async函数的其他语法

除了`async function() {}`这样声明一个async函数之外，也可以有如下几种写法：

#### 箭头函数

```javascript
const promise = async url => {
  const response = await fetch(url);
  return response.json();
};
```

#### 对象方法

```javascript
const work = {
  async debug(code) {
    // ...
  }
}
```

#### 类方法

```javascript
class Button {
  async onPress() {
    // ...
  }
}
```

### 需要注意的问题

先看下面的代码，假设`fetchPosts`函数需要1s的执行时间：

```javascript
async function fetchAllPosts() {
  // ...
  await fetchPosts(URL_1)
  await fetchPosts(URL_2)
  return true;
}
```

上面的函数，因为两个await是顺序执行的，所以总共需要2s的执行时间。

再看下面的版本：

```javascript
async function fetchAllPosts() {
  // ...
  const fetch_1 = fetchPosts(URL_1)
  const fetch_2 = fetchPosts(URL_2)

  await fetch_1;
  await fetch_2;
  return true;
}
```

上面的代码，因为fetchPosts操作是同时进行的，所以总共需要1s的执行时间。

在实际工作中需要特别注意这个问题，以避免不必要的执行耗时。









