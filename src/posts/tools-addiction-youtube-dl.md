---
title: "工具控系列：youtube-dl"
date: "2018-12-09"
tags: ["tools"]
---

Youtube是全球最大的视频网站，上面有各色各样非常多的视频。Youtube最吸引我的是各互联网大厂的技术频道，因为里面有各种顶尖会议的录播和教学视频。比如Google Developers频道中有Google I/O大会的视频。

虽然购买Youtube Premium会员可以在App上下载视频供离线观看，但并没有对中国大陆开放订阅。我尝试通过代理，假装在美国去订阅会员，但最后浦发的Visa信用卡没有通过验证，因为需要美国信用卡。既然如此，我又非常想
下载想看的视频在一些碎片时间观看，所以想到可以用其他方式。

有很多种方法可以下载Youtube视频。比如通过第三方网站，你只要输入链接就可以下载。还可以使用第三方软件去下载。具体可以自行Google，网上有很多文章介绍。

对于程序员，我推荐`youtube-dl`这个命令行工具，它是一个开源项目，Github上目前有[47000+](https://github.com/rg3/youtube-dl)的star。项目中有详细的安装和使用介绍，老司机可以直接跳过去阅读。我这里针对Mac用户
作最简单的介绍。

## 安装

使用Homebrew安装，如果没有安装Homebrew可以执行以下命令先安装Homebrew。

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

然后执行

```bash
brew install youtube-dl
```

### 使用

安装完成后，你就可以使用`youtube-dl`命令行下载youtube上以及其他一些视频网站的视频了。命令行格式如下：

```bash
youtube-dl [OPTIONS] URL [URL...]
```

比如下面的命令是下载Youtube上“Intro & Setup - Progressive Web App Training”这个视频：

```bash
youtube-dl https://www.youtube.com/watch?v=psB_Pjwhbxo
```

非常简单，对不对？

### 参数

`youtube-dl`支持非常多的参数，以对下载视频作一些自定义，比如下面的用法表示同时下载Youtube自动生成的字幕：

```bash
youtube-dl --write-auto-sub https://www.youtube.com/watch?v=psB_Pjwhbxo
```

其余几十个参数的用法，请参考[项目文档](https://github.com/rg3/youtube-dl)。

### 配置

除了直接在命令行加参数对下载作微调，也可以通过配置文件的方式，这样对于一些需要默认的参数不用每次都在命令行输入。
对于Linux或者Mac用户，可以把配置写在`~/.config/youtube-dl/config`这个文件中。以下是我电脑上的简单配置：

```bash
# 你懂的，Youtube访问需要代理
--proxy 127.0.0.1:1087 

# 当下载链接同时含有视频和播放列表信息时，只下载视频而不下载视频所在列表的其他视频
--no-playlist

# 设置默认的存储路径
-o ~/Movies/%(title)s.%(ext)s
```

### 总结

我自己用了一段时间，下载稳定且速度快，幸福感又提高了一点点。好的工具使生活更美好。



