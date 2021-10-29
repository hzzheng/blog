---
title: "Typescript 中给 JSX 元素传递泛型"
date: "2021-05-09"
tags: ["ts-evolution"]
origin: "https://mariusschulz.com/blog/passing-generics-to-jsx-elements-in-typescript"
---

Typescript 2.9 支持给 JSX 元素设置泛型类型参数。这意味着我们可以像下面这样在 TSX 文件中写组件：

```ts
function Form() {
  // ...

  return (
    <Select<string> options={targets} value={target} onChange={setTarget} />
  );
}
```

为了理解为什么泛型 JSX 元素是有用的（以及为什么我们通常并不需要显式地把类型参数写出来），我们先来写一个 `Select` 组件，让后围绕这个组件迭代升级它的静态类型。

### 步骤一：在 Javascript/JSX 中实现 Select

让我们使用 React 实现一个可复用的 Select 组件。我们的组件应该渲染出原生的 `<select>` 元素，并且有一组 `<option>` 子元素：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/typescript-evolution/select_component-2x.r3ukgn6ebw.imm.png)

我们需要给 `Select` 组件传递 `options` 属性，以及当前选中的 `value` 和 `onChange` 回调函数。上面组件截图的代码如下：

```ts
function Form() {
  const targets = [
    { value: "es3", label: "ECMAScript 3" },
    { value: "es5", label: "ECMAScript 5" },
    { value: "es2015", label: "ECMAScript 2015" },
    { value: "es2016", label: "ECMAScript 2016" },
    { value: "es2017", label: "ECMAScript 2017" },
    { value: "es2018", label: "ECMAScript 2018" },
    { value: "es2019", label: "ECMAScript 2019" },
  ];

  const [target, setTarget] = useState("es2019");

  return <Select options={targets} value={target} onChange={setTarget} />;
}
```

我们该如何在普通的 Javascript/JSX 中实现 `Select` 组件？以下是第一次尝试：

```ts
function Select(props) {
  function handleOnChange(e) {
    props.onChange(e.currentTarget.value);
  }
  return (
    <select value={props.value} onChange={handleOnChange}>
      {props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
```

