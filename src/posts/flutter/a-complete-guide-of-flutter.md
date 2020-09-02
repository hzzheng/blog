---
title: "Flutter 开发完整指南"
date: "2020-09-01"
tags: ["flutter"]
---

本文的写作目的是为了方便有一定 UI 编程经验的开发者快速上手 Flutter 开发移动应用，并且对 Flutter 开发的相关主题有全貌的认识。在每个主题介绍之后，会附有相关的文章链接，方便有兴趣的同学更深入地学习。在文章的最后，根据我自己的学习过程，整理了一些系统性的学习资料，推荐阅读观看。

#### What & Why

Flutter 是 Google 开源的跨端开发方案，支持移动端、Web 以及桌面端开发，所谓 “One Codebase to Rule Them All”。Web 和桌面端的实现目前还不完善，相关功能还在开发中，所以暂时并不能直接投入到生产中使用。但移动端开发已经非常成熟，相比于同为跨端开发方案的 React-Native，Flutter 有势均力敌甚至赶超的趋势，不管是 Google Trends，还是 Stack Overflow Trends 都能从中窥见端倪。以下是 Stack Overflow Trends 上的截图，可以看出 Flutter 的社区活跃度可能已经超过 React-Native。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-trends.png)

目前，无论国外还是国内，都已经有非常多的大厂投入使用，并且沉淀出了一些最佳实践。比如国内的阿里闲鱼、腾讯、美团等都有一些不错的相关技术内容输出。

所以为什么 Flutter 能在众多的跨端方案中脱颖而出，并且大有侵蚀原生开发技术的趋势？

可以从以下几个方面来回答这个问题：

- 接近 Web 的开发体验。因为 Flutter 基于 Dart 语言开发，Dart 是一门既支持 AOT 也支持 JIT 编译的语言，在开发环境下通过 JIT 编译实现的维持状态的热更新（见图 1），比原生开发需要等待几十秒甚至更长时间编译后才能看到效果的体验要好太多。另外，它的声明式、响应式编程风格，通过数据驱动 UI 更新对于习惯了 React 或者 Vue 的前端开发是非常熟悉友好和高效的。以上以及其他配套的工具（比如调试工具）极大提高了开发者的效率。
  
![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/why-flutter-uses-dart/1_c1dM9uhkRj9_fpiDrLJmDw.gif)

<figcaption style="text-align: center; margin-top: -20px; color: #a6a6a6; padding-bottom: 20px;">
<i>图 1（来源：https://medium.com/hackernoon/why-flutter-uses-dart-dd635a054ebf） </i>
</figcaption>

- 接近原生的用户体验。在技术选型的时候，会有一些权衡，因为有时候很难找到完美的解决方案，而是寻求综合而言最合适的。抛开产品架构、交互设计等方面的影响，单纯从技术角度考虑，影响用户体验的因素主要包括 UI 是否足够精致，动画是否足够流畅，交互响应是否足够快等。这方面，Flutter 做得足够好，因为 Flutter 自带渲染引擎（Skia）以及 UI 控件库（Material UI & Cuperino）, 并且可以高度定制化，可以实现非常精致的UI。又因为 Dart 支持 AOT 编译，发布的时候会编译成原生代码，没有 JSBridge 的通信消耗，很大程度提升了应用运行的性能。有一个国外团队对相关技术栈做了基准测试，具体可以阅读本节的附录文章。
- 跨端带来的研发效能提升。因为有 iOS 和 Android 两个阵营，并且技术栈不同，所以很多公司都会维持两个客户端开发团队。这对人力其实是一种浪费，如果能统一技术栈，那么可能只需要一半的人就可以做全部的工作。同时，Flutter 相比原生开发要简单很多，开发者只要有一定的 UI 编程经验，很容易上手开发。如果使用 Flutter，可以整合 iOS、Android、Web 的开发资源，国外有团队使用 Flutter 后声称实现了3倍研发能力的提升。另外，这也能很大程度解决中小厂的招聘问题。
- 大厂和活跃社区的支持。众所周知，Flutter 是 Google 开源的技术，并且这几年在不遗余力地推广。大厂对某种开源技术的支持通常会有企业战略和利益方面的思考。Fuchsia，是由 Google 公司开发的新操作系统，意在解决 Google 认为的 Linux 以及 Android 现存的一些问题。Fuchsia 支持 Flutter 做为 UI 开发框架，所以可以相信 Flutter 未来会持续得到 Google 的资源投入。此外，Flutter 吸引了大量开源社区开发者，官方仓库上有大量优质的第三方包。

> 相关资源

1. Flutter 官网 https://flutter.dev/
2. 官方仓库 https://pub.dev/
3. 闲鱼技术博客 https://www.yuque.com/xytech/flutter/
4. 各技术栈性能对比 https://medium.com/swlh/flutter-vs-native-vs-react-native-examining-performance-31338f081980
5. What’s Revolutionary about Flutter https://medium.com/hackernoon/whats-revolutionary-about-flutter-946915b09514

#### Dart

上文已经提到，Flutter 是基于 Dart 开发的。关于 Flutter 为什么选择 Dart 语言，具体可以阅读我之前翻译的“为什么 Flutter 选择了 Dart 语言”（见本节附录）。总结而言，主要有以下几点：

- Dart 既支持 JIT 也支持 AOT 编译，这保证了极佳的开发体验（热更新）以及应用性能（最终编译成原生代码）。
- Dart 声明式、可编程的布局更容易阅读和视觉化，不需要学习另一种布局语言比如 JSX 或者 XML。
- Dart 特别容易学习，因为它包含的特性对于无论是动态语言还是静态语言用户都很熟悉。

我们看下官网上的示例，体验一下 Dart 的语法：

```dart
// Hello World
void main() {
  print('Hello, World!');
}

// Variables
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg'
};

// Control flow statements
if (year >= 2001) {
  print('21st century');
} else if (year >= 1901) {
  print('20th century');
}

for (var object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

while (year < 2016) {
  year += 1;
}

// Functions
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

var result = fibonacci(20);

// Classes
class Spacecraft {
  String name;
  DateTime launchDate;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  int get launchYear =>
      launchDate?.year; // read-only non-final property

  // Method.
  void describe() {
    print('Spacecraft: $name');
    if (launchDate != null) {
      int years =
          DateTime.now().difference(launchDate).inDays ~/
              365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

是不是很熟悉，很简单？

关于 Dart 的学习，建议直接阅读官方文档。

> 相关资源

1. Dart 官网 https://dart.dev/
2. DartPad https://dartpad.dev/
3. 为什么 Flutter 选择了 Dart 语言 https://chaosflutter.com/posts/flutter/why-flutter-uses-dart/

#### 环境准备

首先需要安装 Flutter SDK，具体可以参考官方的安装指南（见附录）。安装完成后在命令行执行：

```bash
flutter doctor
```
会输出类似以下的结果，如果是首次安装，可能会有更多的检查项不通过，可以根据提示来完善开发环境。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-doctor.png)

根据官方指南配置好环境以后，需要选择一个 IDE 进行开发，Android Studio 和 VSCode 都是不错的选择，本文以 Android Studio 为例来说明。

下载安装 Android Studio 并且设置好模拟器（见 Flutter 官方安装指南 Set up the Android emulator 部分），为了方便 Flutter 开发需要安装 Dart 和 Flutter 插件，如下图所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-plugin.png)

安装完成以后在 Android Studio 启动欢迎窗口会多出一个 “Start a new Flutter project” 入口，点击可以快速创建一个 Flutter 应用，如下图所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-init.png)

> 相关资源

1. Flutter 官方安装指南 https://flutter.dev/docs/get-started/install
2. 下载 Android Studio https://developer.android.com/studio


#### 项目结构

点击“Start a new Flutter project”，选择“Flutter Application” 创建 Flutter 应用。初始化项目的结构如下所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-structure.png)

ios 和 android 目录下是相关平台的工程文件，lib 是我们的开发目录，其中 main.dart 是入口文件。该文件中有一个 main 函数，是应用启动的入口。

另外，pubspec.yml 这个文件很重要，它是项目的配置文件，类似于前端开发中的 package.json，可以设置应用名，版本，依赖，本地资源声明等，如下图所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-config.png)

下一小节，我们将通过阅读入口文件 main.dart 中的样板代码来介绍 Widget。

#### Widget

Widget 是 Flutter 中非常重要的概念，可以说 Flutter 中一切都是 Widget，比如 UI 组件、布局、动画等等。以下是初始化项目 main.dart 中的样板代码（删除了大量注释）：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}

```

我们可以看到入口函数 main 中调用了 MyApp，而 MyApp 即是应用的根 Widget。它是一个类，继承了 StatelessWidget。

Widget 根据是否包含状态可以分为 StatelessWidget 和 StatefulWidget，有过 React 开发经验的同学看到这里应该会很熟悉，和 React 中无状态组件一样，StatelessWidget 相对性能更好，适合开发展示型的组件。

MyApp 中有一个 build 方法，组件每次渲染都会调用，类似 React 中的 render 函数。build 方法返回的也是 Widget，这里返回了一个 MaterialApp（因为我们引入了 flutter/material.dart）。它是 Flutter 官方提供的 Widget，用于开发 Material 风格的应用。更多关于 Material Widget 的内容可以参考本节附录中的官方 Widget 列表。

MaterialApp 接受很多配置参数，其中 home 是应用的入口页面，这里是 MyHomePage 这个 Widget。它继承了StatefulWidget，所以内部可以有状态。此处它维护了一个 _counter 状态，每次点击 FloatingActionButton 这个 Widget 会调用 _incrementCounter 方法，进而调用 setState 更新 _counter 的值。看到这里，熟悉 React 的你是不是🈶️会心一笑。

MyHomePage 的 build 方法中，包含了很多 Widget。我们一个个来看：

- 首先它返回的是一个 Scaffold，它提供了页面开发的脚手架，通过 appBar、body 等参数来自定义页面特定区块的内容。
- AppBar 用来定义应用的顶部区域，比如可以通过 title 属性定义页面标题，通过 actions 定义标题之后的操作等。
- Text 文本组件。
- Center 布局组件，可以使它的 child 居中对齐。
- Column 也是布局组件，可以使它的 children 在垂直方向上下排布；
- FloatingActionButton 浮动按钮组件，浮动在页面右下角。

选择模拟器后，可以点击右侧的三角按钮运行应用，如下所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-run.png)

从下图中可以看到各种 Widget 对应的显示效果：

<div style="text-align: center;">
  <img src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/a-complete-guide-of-flutter/flutter-demo.png" width=400>
</div>

Flutter 提供了大量的官方 Widget，想了解更多强烈建议学习附录中的资料。

> 相关资源

1. 官方 Widget Catalog https://flutter.dev/docs/development/ui/widgets
2. Material Widget API https://api.flutter.dev/flutter/material/material-library.html
3. 官方 Youtube 列表 Flutter Widget of the Week https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG


#### 布局

> 相关资源

1. Flutter Layout Cheat Sheet https://medium.com/flutter-community/flutter-layout-cheat-sheet-5363348d037e

#### 手势

#### 路由

#### HTTP

#### 仓库和三方包

#### 状态管理

#### 下一步