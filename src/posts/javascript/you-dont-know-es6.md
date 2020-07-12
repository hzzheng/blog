---
title: "你不知道的 ECMAScript 6"
date: "2018-12-15"
tags: ["sentry"]
---

ECMAScript 6 可以说是 Javascript 语言标准最重要的一次更新。它包含的内容非常多，我相信有相当多的前端程序员并没有很系统地学习过 ES6。比如你是否有完整地阅读过扎老师的[《
Understanding ECMAScript 6》](https://leanpub.com/understandinges6/read#leanpub-auto-importing-without-bindings) 或者阮老师的《ES6 标准入门》，抑或其他相对完备相对系统的资料呢？如果没有，那么下面罗列的这些知识点，有一些你很可能并没有掌握，甚至没有听说过。

### let 和 const

1. 和 var 不同，let/const 不存在变量声明提升，又因为“暂时性死区”的存在，在变量声明前使用变量，即便用 typeof 操作符，也会导致 “ReferenceError”错误。
2. 它们声明的全局变量不属于全局对象的属性，所以你在 window 对象上访问不到这些变量。

### 解构赋值

1. 如果数组形式的解构赋值等号右边不是可遍历的对象会导致报错。事实上，只要数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
2. 只有解构赋值右边对应的值为 undefined 的时候，默认值才会生效。即便是 null 也不行，因为 null 不严格等于 undefined。
3. 字符串因为部署了 Iterator 接口所以也可以被数组形式解构赋值。
4. 数值和布尔值在进行对象形式解构赋值时，会先被转为对象。undefined 和 null 因为不能被转对象，所以会报错。
5. 解构赋值中，非模式部分可以使用圆括号。

### 字符串

1. Javascript 可以采用 \uxxxx 形式表示一个字符，其中 xxxx 表示字符的码点。但是，这种表示法只限于 \u0000 --- \uFFFF之间的字符。超过这个范围的字符，必须用2个双字节的形式表示。ES6对这一点作出了改进，只要将码点放入打括号就能正确解读该字符。
2. Javascript 内部，字符以 UTF-16 的格式存储，每个字符固定2个字节。对于那些需要4个字节的字符（Unicode 码点大于 \uFFFF）,Javascript 会认为它们是2个字符。ES6 提供了 codePointAt 方法，能够正确处理4个字符储存的字符。codePointAt 方法是测试一个字符由2个字节还是4个字节组成的最简单方法。

```javascript
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
} 
```
3. ES5 提供了 String.fromCharCode 方法，用于从码点返回对应字符。但这个方法不能识别 32 位的 UTF-16 字符（Unicode 码点大于 \uFFFF）。ES6 提供的 String.fromCodePoint 解决了这个问题。
4. ES6 为字符串添加了遍历接口，可以用 for...of 循环。这种遍历方式最大的优点是可以识别大于 0xFFFF 的码点。而传统的for循环做不到。
5. startsWith，endsWith，includes 三个方法都支持第二个参数，表示开始搜索的位置。
6. 标签模板其实不是模板，而是函数调用的一种特殊形式。


### 正则
1. 增加了 u 修饰符，可以正确识别大于二字节的字符。
2. 增加了 y 修饰符，和 g 类似，不同的是，y 修饰符会确保匹配必须从剩余的第一个位置开始。


### 数值
1. ES6 提供了二进制和八进制数值的新写法，分别用前缀0b 和 0o 表示。
2. Number.isFinite 和 Num.isNaN 和之前的全局方法的不同在于，它们不会对传入的非数值进行数值转换。这样做的目的，是为了减少全局性方法，使语言逐步模块化。
3. 极小常量 Number.EPSILON 可以检查浮点运算可以接受的误差范围。
4. Javascript 能够准确表示的证书范围在正负 2的53 方，ES6 引入了 Number.MAX_SAFE_INTEGER 和 Number.MINI_SAFE_INTEGER 两个常量来表示范围的上下限。
5. Math 的扩展：Math.trunc 会去除一个数的小数部分，Math.sign 会放回一个数是正数还是负数还是零。

### 数组
1. Array.from 方法用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象。
2. 只要是部署了 Iterator 接口的数据解构，Array.from 都能将其转为数组。
3. 扩展运算符也能调用遍历器接口，将数据转为数组，比如 arguments 对象，Nodelist 对象等。但 Array.from 可以转换任意有 length 属性的对象。
4. Array.from 还能接受第二个参数，作用类似数组的 map 方法，比如：

```javascript
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```

5. Array.from 可以将字符串转为数组，并且能返回正确的length：

```javascript
function countSymbols(string) {
  return Array.from(string).length
}
```

6. fill 方法使用给定值填充数组。
7. 数组的 includes 方法能准确判断是否含有 NaN。
8. ES6 明确将数组空位转为 undefined。

### 函数
1. 如果参数默认值是一个变量，该变量所处的作用域和其他变量作用域规则一样。
2. 参数默认值如果是一个表达式，则在运行时执行，而非定义时。
3. 箭头函数不能使用 new，没有 arguments 对象，不能用作 generator 函数。没有自己的this，所以也不能使用 call 等方法。
4. 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，直接用内层函数的调用帧来取代外层函数的即可。


### 对象
1. Object.is 用来比较两个值是否严格相等。它与严格个比较运算符（===）的行为基本一致。不同的是，+0 不等于 -0，NaN等于自身。
2. 克隆对象，并且保留继承链：

```javascript
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```
 
3. Object.getOwnPropertyDescriptor 可以获取属性的描述对象。
4. ES6 一共有6种方法可以遍历对象的属性。for...in 循环遍历对象自身和继承的可枚举属性（不含 Symbol 属性）。Object.keys()返回的数组包含对象自身的可枚举属性（不含 Symbol 属性）。Object.getOwnPropertyNames() 返回的数组，包含自身的所有属性（不含 Symbol 属性）。Object.getOwnPropertyNames() 返回的数组包含对象的所有 Symbol 属性。Reflect.ownKeys(obj) 返回一个数组，包含对象自身的所有属性。

### Symbol