---
title: "Typescript 中的条件类型"
date: "2021-04-25"
tags: ["ts-evolution"]
origin: "https://mariusschulz.com/blog/conditional-types-in-typescript"
---

Typescript 2.8 引入了条件类型，它是类型系统强有力的补充。条件类型允许我们表达更灵活的类型映射，也就是，类型转换会根据不同的条件而不同。

### 介绍条件类型

条件类型会先测试一种类型关系，并基于测试结果，选择两种可能类型中的一种。它永远有以下的形式：

```ts
T extends U ? X : Y
```

条件类型使用了熟悉的 `... ? ... : ...` 语法，它在 Javascript 中被用于条件表达式。`T`, `U`, `X` 和 `Y` 代表了任意类型。 其中 `T extends U` 部分描述了类型关系测试。如果条件满足，类型 `X` 被选择，否则类型 `Y` 被选择。

如果使用人类语言，条件类型可以描述如下：如果类型 `T` 可以赋值给 `U`，选择类型 `X`，否则选择类型 `Y`。

下面的条件类型例子来自于 Typescript lib.es5.d.ts 类型定义文件中预定义的类型：

```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

`NonNullable<T>` 类型会选择 `never` 类型，如果类型 `T` 可以赋值给类型 `null` 或者类型 `undefined`，否则它会使用类型 `T`。`never` 类型是 Typescript 的 [bottom type](https://en.wikipedia.org/wiki/Bottom_type)，表示这个类型的值不可能存在。

### 可分配的条件类型

为什么结合条件类型和 `never` 类型是有用的？因为它允许我们从一个联合类型中移除某些类型。如果条件类型关系测试的是原始的泛型参数（naked type parameter，译者注：也就是 T，而不是 [T] 之类），则条件类型被称为可分配的条件类型（见[Distributive conditional types ](https://www.zhihu.com/question/470581497/answer/1985882672)），它会在联合类型实例化的时候基于联合类型进行类型分配。

因为 `NonNullable<T>` 