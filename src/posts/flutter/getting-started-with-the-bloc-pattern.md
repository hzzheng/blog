---
title: "BLoC 模式入门"
date: "2020-07-20"
tags: ["flutter"]
origin: "https://www.raywenderlich.com/4074597-getting-started-with-the-bloc-pattern"
---

摘要：讲解如何使用流行的 BLoC 模式来架构你的 Flutter 应用，以及通过 Dart streams 来管理组件的数据流。

版本：Dart 2, Flutter 1.7, Android Studio 3.4

在应用开发领域，如何设计一个应用的结构通常是最具争议的话题之一。每个人似乎都有他们最喜欢的带有花俏首字母缩写词的架构模式。

iOS 和 Android 开发者擅长使用 Model-View-Controller (MVC)，并且会默认选择这种模式来开发应用。Model 和 View 是分离的，然后通过 Controller 在他们之间传递信息。


然后，Flutter 带来了一种新的和 MVC 不完全兼容的响应式风格。经典模式（MVC）的这个变体兴起于 Flutter 社区——BLoC。

BLoC 代表 Business Logic Components（业务逻辑组件）的意思。BLoC 模式的主旨是应用中的所有事务都应该用事件流（stream of events）来表示：组件（wigets）提交事件；其他组件响应事件。BLoc 处于这个过程的中间，管理相互间的会话。Dart 设置提供了一些语法来处理流，而流本身也是这门语言的内置功能。

关于这个模式最棒的是，你不需要引入任何插件或者学习自定义的语法。Flutter 提供来你所需要的一切。

在这个教程中，你会创建一个应用来查找餐馆，使用的是 [Zomato](https://www.zomato.com/) 提供的 API。在教程的最后，这个应用可以做下面这些事：

1. 用 BLoC 模式包装 API 调用
2. 搜索餐馆并且异步地展示结果
3. 维护一个最喜欢餐馆的列表，并且可以在多个页面查看

### 正式开始

通过 Download Materials 按钮下载初始化项目，然后用你最喜欢的 IDE 打开。在这个教程中，我会使用 Android Studio，但如果你喜欢你也可以使用 Visual Studio Code。确保运行了 `flutter packages get` 命令来下载最新版本的 http 包，这可以通过命令行或者 IDE 弹窗提示来操作。

初始化项目包含了一些基本的样板代码和从网络下载的文件。当你打开这个项目，它应该像下面这样：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/getting-started-with-dart/01-android-studio-starter-650x346.png)

有三个需要和 Zomato 交互的文件。

#### 获得一个 Zomato API Key

在开始开发应用之前，你需要获得一个 API key。去 Zomato 开发者网站 https://developers.zomato.com/api 创建一个账号，生成一个新的 key。

然后打开 DataLayer 目录下的 zomato_client.dart 文件，修改类声明下面的常量：

```dart
class ZomatoClient {
  final _apiKey = 'PASTE YOUR API KEY HERE';
  ...
```

> 注意：生产环境最好不要把 API keys 存储在源码或者放到版本管理中。最好在构建的时候通过配置文件读取。

构建并运行应用，它会显示一个空白的页面。

<img src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/getting-started-with-dart/2.png" style="width: 50%;margin-left: 25%;" />

这有点单调乏味，我们现在就来修改它。

### 我们来烤一个夹心蛋糕

当我们写应用的时候，不管是使用 Flutter 或者其他框架，对类进行分层是非常重要的。这更多是一种非正式的习惯，而不是你在代码里可以看到的具体的东西。

每一层，或者说一组类，大体上负责一种任务。初始化的项目包含了一个叫 DataLayer 的目录，这个数据层负责应用的模型以及和后端连接，它完全不关心 UI 的部分。

每个项目多少会有些不同，但总体上，你会构建出类似下面这样的东西：

<img src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/getting-started-with-dart/03-BLoC-layers-1.png" style="width: 50%;margin-left: 25%;" />

这种架构约定并没有和经典的 MVC 有多大的不同。UI/Flutter 层只能和 BLoC 层通信。BLoC 层向 Data 和 UI 层发送事件并且处理业务逻辑。这种结构可以很好地随着应用成长进行扩展。

#### BLoC 的内部构成

BLoC 模式真的只是围绕 Dart streams 的接口：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/getting-started-with-dart/04-BLoC-diagram-1-650x284.png)

Streams，就像 Futures，是由 `dart:async` 这个包提供的。一个 stream 就像一个 Future，和 Future 只能异步地返回一个值不同，stream 可以随着时间推移产生很多的值。如果 Future 是一个最终会被提供的值，那么 stream 就是随着时间推移断断续续提供的一系列的值。

`dart:async` 这个包提供了一个对象叫做 StreamController。StreamController 是管理角色的对象，能够实例化一个 stream 和 一个 sink。sink 是 stream 的对立面。一个 stream 随着时间会输出很多值，而一个 sink 会随着时间输入很多值。

总而言之，BLoC 是处理和储存业务逻辑的对象，通过 sink 来接收输入，通过 stream 来说提供输出。


### 位置页面

在你能使用应用找到好餐馆之前，你需要先告诉 Zomato 你想在哪里吃饭。在这个部分，你会创建一个简单的页面，包含了一个顶部的搜索框，以及一个用来展示结果的列表。

> 注意：不要忘了在写代码之前开启 DartFmt。这是开发 Flutter 应用的正确姿势。

在 lib/UI 目录下，创建一个新文件 location_screen.dart。在这个文件中增加一个名为 `LocationScreen` 的 `StatelessWidget`：

```dart
import 'package:flutter/material.dart';
class LocationScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Where do you want to eat?')),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: TextField(
              decoration: InputDecoration(
                  border: OutlineInputBorder(), hintText: 'Enter a location'),
              onChanged: (query) { },
            ),
          ),
          Expanded(
            child: _buildResults(),
          )
        ],
      ),
    );
  }


  Widget _buildResults() {
    return Center(child: Text('Enter a location'));
  }
 }
```

位置页面包含了一个 `TextField`，用户可以输入位置。

> 注意：当你使用一个没有引入的类的时候，IDE 会报错。你可以把鼠标移到任何有红色下划线的符号上，然后敲击 macOS 的 option+enter（或 Windows/Linux 的 Alt+Enter）或者点击红色的灯泡。这会弹出一个菜单，你可以在其中选择需要导入的正确的文件。

创建另一个文件，main_screen.dart，这个文件会处理应用的页面跳转。增加下面的代码到文件中：

```dart
class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LocationScreen();
  }
}
```

最后，更新 main.dart 返回这个新的页面。

```dart
MaterialApp(
  title: 'Restaurant Finder',
  theme: ThemeData(
    primarySwatch: Colors.red,
  ),
  home: MainScreen(),
),
```

构建并运行应用，它看起来应该像下面这样：

<img src="https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/getting-started-with-dart/05-empty-restaurant-screen-1-281x500.png" style="width: 50%;margin-left: 25%;" />

看上去更好了。不过它还是没有做任何事情，现在我们来创建一些 BLoC。

#### 你的第一个 BLoC

在 lib 目录下创建一个叫 BLoC 的文件夹。这个是你所有 BLoC 类的归宿。

在这个文件夹下创建一个叫 `bloc.dart` 的文件，并且添加一下内容：

```dart
abstract class Bloc {
  void dispose();
}
```

你所有的 BLoC 类都会实现这个接口。这个接口除了强迫你增加一个 `dispost` 方法外没有做其他事。一个关于使用 stream 需要牢记在心的点是，在使用完它们自后需要关闭它们，否则会引起内存泄漏。`dispose` 方法就是应用用来检测这一点的地方。

第一个 BLoC 会负责处理应用已选择的地理位置。

在 BLoC 文件夹下，创建一个新文件，location_bloc.dart，添加如下代码：

```dart
class LocationBloc implements Bloc {
  Location _location;
  Location get selectedLocation => _location;

  // 1
  final _locationController = StreamController<Location>();

  // 2
  Stream<Location> get locationStream => _locationController.stream;

  // 3
  void selectLocation(Location location) {
    _location = location;
    _locationController.sink.add(location);
  }

  // 4
  @override
  void dispose() {
    _locationController.close();
  }
}
```

可以使用 option+return，然后选择第二项 Import library package:restaurant_finder/BLoC/bloc.dart 来导入基类。

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/getting-started-with-dart/06-flutter-import-popup-1.png)

`LocationBloc` 中的代码做了以下一些事情：

1. 声明了私有的 StreamController 来管理这个 BLoC 的 stream 和 sink。StreamController 使用泛型来告诉类型系统这个 stream 会输出什么类型的对象。

2. 这一行暴露了一个 StreamController stream 的公共 getter。
 
3. 这个函数代表了 BLoC 的输入。它会接收一个 Location 对象，然后缓存到私有的 `_location` 属性中，最后输入到 sink 中供 stream 使用。

4. 最后，在清理方法中，当这个对象被释放后 StreamController 被关闭。如果你不这样做，IDE 会警告 StreamController 内存泄漏。

现在你的第一个 BLoC 完成了，你马上就要创建另一个来读取位置信息。

### 你的第二个 BLoC

在 BLoC 目录下新建一个文件，名为 location_query_bloc.dart，并添加以下代码：

```dart
class LocationQueryBloc implements Bloc {
  final _controller = StreamController<List<Location>>();
  final _client = ZomatoClient();
  Stream<List<Location>> get locationStream => _controller.stream;

  void submitQuery(String query) async {
    // 1
    final results = await _client.fetchLocations(query);
    _controller.sink.add(results);
  }

  @override
  void dispose() {
    _controller.close();
  }
}
```

`//1` 的位置是 BLoC 的输入，这个方法接收一个字符串，然后使用初始化项目中的 `ZomatoClient` 类从 API 请求位置信息。这个地方使用了 Dart 的 `async/await` 语法使得代码更加简洁。返回的结果会发布给 stream。

这个 BLoC 和前面的一个几乎一样，只不过封装了一个 API 调用，而不仅仅是存储和提供给位置信息。

#### 把 BloCs 注入到 Widget 树中

现在你有了两个 BLoC，你需要一种方式把它们注入到 Flutter 的 widget 树中。Flutter 中习惯叫这些类型的 widget 为 provider。一个 provider 就是一个存储数据并且提供数据给它所有后代 widget 的 widget。

通常这是 `InheritedWidget` 做的事情，但因为 BLoC 需要销毁，所以选择了 `StatefulWidget` 提供这种服务。语法会稍微复杂一些，但结果是一样的。

在 BLoC 目录下创建一个文件叫 bloc_provider.dart，并添加以下内容：

```dart
// 1
class BlocProvider<T extends Bloc> extends StatefulWidget {
  final Widget child;
  final T bloc;

  const BlocProvider({Key key, @required this.bloc, @required this.child})
      : super(key: key);

  // 2
  static T of<T extends Bloc>(BuildContext context) {
    final type = _providerType<BlocProvider<T>>();
    final BlocProvider<T> provider = findAncestorWidgetOfExactType(type);
    return provider.bloc;
  }

  // 3
  static Type _providerType<T>() => T;

  @override
  State createState() => _BlocProviderState();
}

class _BlocProviderState extends State<BlocProvider> {
  // 4
  @override
  Widget build(BuildContext context) => widget.child;

  // 5
  @override
  void dispose() {
    widget.bloc.dispose();
    super.dispose();
  }
}
```

从上面代码中可以看到：

1. `BlocProvider` 是一个支持泛型的类。泛型 `T` 被约束为一个实现了 Bloc 接口的对象。这意味着，provider 只能存储 BLoC 对象。

2. `of` 方法允许 widget 树中的后代 widget 通过当前的构建上下文（build context）来检索获取 `BlocProvider`。这在 Flutter 中是非常通用的模式。

3. 这是一种获取泛型类型引用的方式。

4. 这个 widget 的 `build` 方法完全委托给了它的 child。它本身没有做任何渲染的事情。

5. 最后，provider 之所以继承 `StatefuleWidget` 的唯一原因就是为了能够访问到 `dispose` 方法。当这个 widget 从树中移除时，Flutter，会调用这个 dispose 方法，进而关闭这个 stream。

### 连接位置页面




*（欢迎转载，但请保留文章地址）*








