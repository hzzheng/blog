---
title: "Sentry 简明指南"
date: "2019-04-10"
tags: ["sentry"]
---

本指南包含以下几个部分：

- 如何上手
- 如何上报事件
- 如何设置 Context
- 如何设置 Breadcrumbs
- 如何收集用户反馈
- 如何设置 Release
- 如何设置事件分组
- 如何设置 SourceMaps


### 如何上手

#### 1. 安装SDK

以Node.js为例：

```
yarn add @sentry/node@5.1.0
```
或者
```
npm install @sentry/node@5.1.0
```

#### 2. 配置SDK

首先在 [Sentry](https://sentry.io) 上注册，并创建一个project。创建后可以拿到一个dsn（Data Source Name），它看起来有点像域名但并不是。

然后在你的项目中添加如下代码：

```javascript
const Sentry = require('@sentry/node');
// 注意替换成你项目的dsn
Sentry.init({ dsn: 'https://fdefeaabf2a243f695629d8b4e1a05b2@sentry.io/1448458' });
```

除了dsn，还有以下一些重要的配置项：

- `release`： 代表某个代码版本。设置`release`后会开启一些功能，包括`sourcemaps`，具体见文章相应段落。
- `environment`： 设置环境。在Sentry后台可以通过环境过滤issues，releases等。
- `debug`： 是否开启debug模式，开启后会在浏览器控制台打印一些debugging信息。

其他配置项请参考官方文档 [Configuration](https://docs.sentry.io/error-reporting/configuration/?platform=node)。

### 如何上报事件

#### 1. 捕获事件
Sentry SDK会自动上报fatal errors。你也可以手动上报错误。示例代码如下：

```javascript
try {
    aFunctionThatMightFail();
} catch (err) {
    Sentry.captureException(err);
}
```

你也可以使用`captureMessage`上报一段文本：
```javascript
Sentry.captureMessage('Something went wrong');
```

#### 2. 过滤事件

可以对上报的事件做一些自定义处理，在init的时候添加`beforeSend`配置项，示例代码如下：

```javascript
Sentry.init({
  beforeSend(event) {
    // Modify the event here
    if (event.user) {
      // Don't send user's email address
      delete event.user.email;
    }
    return event;
  }
});
```

### 如何设置 Context

可以通过设置上下文（context）的方式，在事件触发的时候上报更多有用的信息。主要包含以下几方面信息：

#### 1. Structured Contexts

比如OS、Runtime等信息。Sentry会自动设置并上传这些信息。

#### 2. User

当前用户信息。设置用户的示例代码如下：

```javascript
Sentry.configureScope((scope) => {
  scope.setUser({"email": "john.doe@example.com"});
});
```

可以通过`id`、`username`、`email`、`ip_address`来设置一个用户，这些字段都是可选的，但至少需要设置其中一个。

#### 3. Tags

可以给事件设置标签，在Sentry后台可以通过tags过滤事件。示例代码如下：

```javascript
Sentry.configureScope((scope) => {
  scope.setTag("page_locale", "de-at");
});
```

#### 4. Level

可以通过`level`设置事件的严重程度。可选值包括'fatal', 'error', 'warning', 'info', 和 'debug'。默认'error'。示例代码如下：

```javascript
Sentry.configureScope((scope) => {
  scope.setLevel('warning');
});
```

#### 5. Fingerprint

Sentry可以通过`fingerprints`来决定如何将事件分组成issues。具体内容见如何设置事件分组。

#### 6. Extra Context

你也可以设置自定义的key/value数据，这些数据会和事件一起存储起来。示例代码如下：

```javascript
Sentry.configureScope((scope) => {
  scope.setExtra("character_name", "Mighty Fighter");
});
```

以上设置在项目中是全局可见的，你也可以设置local scopes。如果你只需要在某个事件上报的时候设置一些信息，可以像下面这样做：

```javascript
Sentry.withScope(scope => {
  scope.setTag("my-tag", "my value");
  scope.setLevel('warning');
  // will be tagged with my-tag="my value"
  Sentry.captureException(new Error('my error'));
});

// will not be tagged with my-tag
Sentry.captureException(new Error('my other error'));
```

### 如何设置 Breadcrumbs

Sentry中Breadcrumbs指的是某个事件触发的路径，它会记录事件触发前触发的一些列事件。通常Sentry会自动搜集记录这些事件，比如异常发生之前的点击事件等。

#### 1. 记录 Breadcrumbs

你可以通过SDK API手动记录。每个Breadcrumb可以包含这些字段：Message、Data、Category、Level、Type。

示例代码如下：
```javascript
Sentry.addBreadcrumb({
  category: 'auth',
  message: 'Authenticated user ' + user.email,
  level: Sentry.Severity.Info
});
```

#### 2. 过滤 Breadcrumbs

和过滤事件一样，你也可以在每次记录Breadcrumb之前，做一些自定义处理，或者干脆忽略这个Breadcrumb（返回null）。示例代码如下：
```javascript
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://<key>@sentry.io/',
  beforeBreadcrumb(breadcrumb, hint) {
    return breadcrumb.category === 'ui.click' ? null : breadcrumb;
  },
});
```

### 如何收集用户反馈

当错误发生的时候，如果你想从用户那儿了解究竟发生了什么，你可以通过Sentry提供的用户反馈组件来获取用户主动提供的相关信息。示例代码如下：

```javascript
Sentry.showReportDialog({ eventId: '{{ sentry_event_id }}' })
```

`eventId`是关联的事件id，其他可选参数可以参考官方文档 [User Feedback](https://docs.sentry.io/enriching-error-data/user-feedback/?platform=node)。

### 如何设置 Release

一个release代表了待部署代码的某个版本，设置了release以后，能够开启Sentry更多的功能，比如关联commit和release能够推断出哪个commit引入了问题，并且谁应该负责。具体设置分三个步骤：

- 配置SDK
- 创建release并且关联commits
- 部署一个release的时候告知Sentry

#### 1. 配置SDK

在init中设置release，值可以是任意的字符串，可以用git SHA，需要注意的是，这个值在一个organization（组织）内需要是唯一的。示例代码如下：

```javascript
Sentry.init({
  release: "my-project-name@2.3.12"
})
```

这样做以后，每次上报event的时候都会带上release信息。建议在真实部署代码之前告知Sentry有新的部署（具体做法见下文），以解锁一些release相关功能。不过，Sentry也会在第一次收到带release信息的错误后自动在系统中创建一个release。

#### 2. 创建release并且关联commits

有两种方式可以做，一种是关联代码仓库，另一种是手动上传commit数据，推荐第一种，这里也只介绍第一种方式。

##### 2.1. 关联仓库

在 Organization Settings > Integrations 中，可以连接相应仓库，如图所示：

![](https://docs.sentry.io/assets/releases-repo-integrations-b18d5eb561ed71eb65307c92db632c0173b605f92742be81777012b2c09e6e3f.png)

![](https://docs.sentry.io/assets/releases-repo-add-8cb7b6c6c5368b356a1962bd37eb90724164d66c0edda5fa490743be5a298241.png)

##### 2.2. 关联commits到某个release

在部署过程中，添加以下步骤在Sentry上创建release并关联commits。有两种方式可以实现：

1. 使用 sentry-cli 命令行工具（推荐）
2. 使用 sentry API

下面介绍使用 sentry-cli 这种方式创建release并关联commits，示例代码：

```javascript
# Assumes you're in a git repository
export SENTRY_AUTH_TOKEN=...
export SENTRY_ORG=my-org

# Create a release
sentry-cli releases new -p project1 your-release-name

# Associate commits with the release
sentry-cli releases set-commits --auto your-release-name
```

SENTRY_AUTH_TOKEN 可以在Sentry账号的Auth Tokens中查看，如果没有，可以新建一个。

SENTRY_ORG 是组织名称。

第三个命令是给project1创建一个 release, 注意替换"your-release-name"为你在Sentry.init中配置的release名称。

第四个命名是自动关联commits。注意替换"your-release-name"。


##### 2.3. 关联 commits 之后

在完成以上步骤之后，在issue页面会显示suspect commits 和 suggested assignees。这两个字段是Sentry根据commits、release、错误的stack trace，以及ownership rules等推断出来的。

![](https://docs.sentry.io/assets/suspect-commits-highlighted-06e3323e75882a48183734ce676508250873fb389ab3af623d784980f95874e0.png)

另外，你也可以在commit信息中包含issue ID来resolve（表示已解决）这个issue。示例如下：

```sh
git ci -m "Fix: Sentry-317"
```

当你再次创建一个release后，Sentry会在这个release中把该issue置为resolved。

#### 3. 部署一个release的时候告知Sentry

当你部署一个release的时候请告知Sentry，Sentry会自动发邮件给相关的用户（提交了commits给这个release的用户）。

![](https://docs.sentry.io/assets/deploy-emails-a5ae41af83985913dbd26551586172f63d75660ba4789a4f332722401543f375.png)

命令行示例如下，注意需要设置环境：

```sh
sentry-cli releases deploys VERSION new -e ENVIRONMENT
```

### 如何设置事件分组

Sentry会根据一些信息对相似的事件进行分组，并产生一个isssue，一个issue可以包含很多的events。具体的分组策略可以参考官方文档 [Rollups & Grouping](https://docs.sentry.io/data-management/rollups/?platform=node)。

除了默认的分组策略，你也可以通过设置fingerprints自定义分组，这个值会随着事件一起发送到Sentry后台。示例代码如下：

```javascript
Sentry.configureScope((scope) => {
  scope.setFingerprint(['my-view-function']);
});
```

有两种使用fingerprints的场景：

1. 拆分一个group成多个groups

比如你的应用会请求RPC接口或者外部的API服务，他们的报错信息基本是一样的，所以Sentry默认会将这些报错分为一组，但你可以通过fingerprints将他们分开，示例代码如下：

```javascript
class MyRPCError extends Error {
  constructor(message, functionName, errorCode) {
    super(message);

    // The name of the RPC function that was called (e.g. "getAllBlogArticles")
    this.functionName = functionName;

    // For example a HTTP status code returned by the server.
    this.errorCode = errorCode;
  }
}

Sentry.init({
  ...,
  beforeSend: (event, hint) => {
    const exception = hint.originalException;

    if (exception instanceof MyRPCError) {
      event.fingerprint = [
        '{{ default }}',
        String(exception.functionName),
        String(exception.errorCode)
      ];
    }

    return event;
  }
});
```

2. 合并多个groups成一个group

有时候很多group太小，并且这些group其实是同一个大类的错误，可以用fingerprints合并成一个group，示例代码如下：

```javascript
class DatabaseConnectionError extends Error {}

Sentry.init({
  ...,
  beforeSend: (event, hint) => {
    const exception = hint.originalException;

    if (exception instanceof DatabaseConnectionError) {
      event.fingerprint = ['database-connection-error'];
    }

    return event;
  }
});
```

### 如何设置 SourceMaps

如果没有sourcemaps，在Sentry的issue中只能看到压缩后的代码，对于排查问题非常不方便，所以应该开启sourcemaps功能。以下针对使用webpack打包的项目做简单介绍。

首先安装对应的webpack插件：

```sh
npm install --save-dev @sentry/webpack-plugin
# or
yarn add --dev @sentry/webpack-plugin
```

在项目根目录创建一个.sentryclirc，需要配置token、org、project等信息，具体见官方文档 [Configuration and Authentication](https://docs.sentry.io/cli/configuration/)。

然后在webpack.config.js中添加如下代码：

```javascript
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
  // other configuration
  plugins: [
    new SentryWebpackPlugin({
      include: '.',
      ignoreFile: '.sentrycliignore',
      ignore: ['node_modules', 'webpack.config.js'],
      configFile: 'sentry.properties'
    })
  ]
};
```

除了webpack自动上传的方式，你也可以使用 sentry-cli 手动上传sourcemaps。

首先创建一个release:

```sh
sentry-cli releases new <release_name>
```

注意<release_name>需要和你init中配置的一样。

然后使用upload-sourcemaps上传sourcemaps：

```sh
sentry-cli releases files <release_name> upload-sourcemaps /path/to/files
```

最后完成这次release：

```sh
sentry-cli releases finalize <release_name>
```

成功完成以上步骤后，当触发了一个issue后可以在issue页面看到报错的源代码，如下图所示：

![](https://i.loli.net/2019/05/08/5cd2a34179604.png)