---
title: "如何在国内使用Google Home Mini"
date: "2018-06-04"
---

上周去东京，买了两个Google Home Mini，自己和女票一人一个。昨天在家折腾半天，因为众所周知的原因，在国内使用Mini需要自己搭梯子。追寻自由的路总是磕磕绊绊，当深夜里Mini说出"play some music on Spotify..."的时候，简直泪流满面。

#### 1、小米路由器刷开发版ROM

我买的是小米路由器3，然后到[小米路由器网站](http://www1.miwifi.com/miwifi_download.html)下载对应的开发版ROM固件。访问miwifi.com路由器页面，点击常用设置->系统状态->手动升级，选择刚刚下载的固件，开始刷机。

#### 2、开启路由器SSH功能

访问[MIWIFI开放平台](http://www1.miwifi.com/miwifi_open.html)页面，点击[开启SSH工具]，如果你的小米账号有绑定路由器，会获得路由器的root密码。下载工具包，按照页面上的指示一步步开启路由器SSH功能。

#### 3、安装Misstar Tools

Misstar Tools是小米路由器的工具包，提供了很多路由器插件，包括科学上网的插件Shadowsocks。详情可以参看[论坛介绍](http://www.miui.com/thread-4408033-1-1.html)。安装步骤如下：

```bash
# 登录小米路由器
ssh root@192.168.31.1

# 安装
wget http://www.misstar.com/tools/appstore/install.sh -O /tmp/install.sh && chmod +x /tmp/install.sh && /tmp/install.sh
```

安装完成后，刷新路由器页面会出现一个[MT工具箱]菜单。如果页面打不开出现/web/misstar/index没有注册的错误，可以参考[这篇文章](http://bbs.xiaomi.cn/t-14166902)进行设置。

如果可以打开MT工具箱页面，则点击插件管理，进入插件中心。因为某些原因，科学上网插件在插件中心找不到，但并不妨碍安装，chrome浏览器中，右键任何一个安装按钮，选择[审查元素]，在出现的html代码中，把选中元素的id修改为ss，然后再点击安装即可。


#### 4、设置Shadowsocks

点击安装好的科学上网插件，进入设置页面。具体如何设置ss不清楚的话，可以自行搜索。推荐在Google Cloud上自己[搭梯子](https://suiyuanjian.com/124.html)。


#### 5、下载Google Home App设置

搭好路由器梯子以后，下载Google Home App对Mini进行设置，具体操作很简单，这里不再赘述。可能遇到的问题是，虽然路由器已经可以科学上网，但Google Home Mini的DNS解析依然会有问题，导致一直设置失败，解决方法参考[这篇文章](https://gist.github.com/willwhui/28e8896b6e4560f1cf0d32a5acf501f3)，具体如下：

```bash
# 登录小米路由器
ssh root@192.168.31.1

# 依次执行
iptables -t nat -A PREROUTING -s 192.168.1.1/24 -p udp --dport 53 -j DNAT --to 192.168.1.1
iptables -t nat -A PREROUTING -s 192.168.1.1/24 -p tcp --dport 53 -j DNAT --to 192.168.1.1
iptables -I PREROUTING -t nat -p udp -d 8.8.4.4 --dport 53 -j REDIRECT --to-ports 1053
iptables -I PREROUTING -t nat -p udp -d 8.8.8.8 --dport 53 -j REDIRECT --to-ports 1053
```

另外，在设置过程中，如果Google Home App有报错，可尝试将手机的系统语言设置成英文。

至此，不出意外你就可以开始调戏Google Home Mini了，恭喜🎉