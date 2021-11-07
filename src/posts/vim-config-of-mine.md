---
title: "高效工作工具篇：常用的 vim 配置和插件"
date: "2021-07-18"
tags: ["tools", "vim", "editor"]
---



在默认配置下，如果掌握了 Vim 的 [常用命令](https://juejin.cn/post/7026995308252889124) 已经可以进行非常高效的文本编辑了。但如果你想更进一步，其实可以稍微花点时间学习一下 Vim 的自定义配置和插件使用。它会让你的 Vim 使用体验更好，编辑效率更高。


### 自定义 Vim 配置

我们可以在用户目录（~）下新增 `.vimrc` 文件，对 vim 的样式和功能进行自定义设置。

比如默认的 Vim 不会在编辑器左侧显示行数，你可以通过下面简单的配置给 Vim 添加行数，方便你在 Vim
中快速定位到具体的行。

```sh
" 设置左侧的行数
set number
```

注意，`.vimrc` 中 `"` 后面的是注释内容。设置前后对比如下：

设置前：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/vim-config/vim-2.jpeg)

设置后：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/vim-config/vim-1.jpeg)


如果仔细看会发现行数是和当前聚焦行的相对值，这种显示方式更方便我们通过 `12k` (向上移动 12 行)
等命令进行光标跳转。相对行需要的设置如下：

```sh
" 设置相对行数
set relativenumber
```

另外，Vim 默认不会对语法高亮，强烈建议开启语法高亮配置：

```sh
syntax on
```

除此之外，Vim 还支持大量其他的配置，比如你可能希望在不同模式下光标能有不同的样式，如果你和我一样在
Mac 中用 iTerm2 终端，可以像下面这样配置：

```sh
" cursor style
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"
```

更多系统和终端光标相关的配置可以参考 [Change cursor shape in different modes](https://vim.fandom.com/wiki/Change_cursor_shape_in_different_modes)。

我上面只是介绍了少数几个配置，如果大家有兴趣，可以研究 github 上 [The ultimate Vim configuration](https://github.com/amix/vimrc) 中的 `basic.vim` 配置。

### .vimrc 中的 map 配置

如果你去看了上面提到的 `basic.vim` 文件，你会发现其中除了一些简单的配置外，还有一些 `map`（其实还有一些
if、function 的 Vimscript 脚本代码，这里不展开，有兴趣可以查阅相关资料）。这些 `map`
其实就是快捷键设置，它的语法如下：

```sh
map_mode 快捷键 需要执行的命令
```

比如我觉得从插入模式退出到命令模式老是要按左上角的 `Esc`
键太麻烦（离手所在位置太远了），我可以将它设置为双击 `j`，它的配置如下：

```sh
inoremap jj <esc>
```

这里需要解释的是 `inoremap`，快捷键映射支持以下的模式：

- `nnoremap` 命令模式
- `inoremap` 插入模式
- `vnoremap` 选择模式

所以上面 map 配置的含义是：在插入模式下，如果双击 `j` 就执行 `Esc` 退出到命名模式。


作为一个程序员，经常需要打引号、括号等符号，如果不能自动补全会非常影响编辑体验，有了
map，这个问题就容易解决了，只要做如下的 map 配置：

```sh
inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap ` ``<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap { {<CR>}<ESC>O
```

### 让 Vim 更强大：插件

有很多插件管理器可以让你方便地给 Vim 添加插件，比如 `Vundle`、`Pathogen` 等，我个人选择 `Vim
Plug`，它的安装和使用非常简单。

安装：

```sh
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
````

然后添加 `call plug#begin('~/.vim/plugged')` 和 `call plug#end()` 到 `.vimrc` 中，类似以下的配置：

```sh
call plug#begin('~/.vim/plugged')

Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
Plug 'scrooloose/nerdtree'
Plug 'junegunn/seoul256.vim'

call plug#end()
````

其中的每一个 `Plug` 就是一个插件。以著名的 `nerdtree` 为例，它可以帮你在 Vim
编辑器的左侧显示目录。你只需要添加 `Plug 'scrooloose/nerdtree'`，保存后，执行 `source
.vimrc`，然后重新打开 `.vimrc`，输入以下命令安装即可：

```sh
:PlugInstall
```

安装后的效果如下所示：

![](https://blog-1258648987.cos.ap-shanghai.myqcloud.com/blog/vim-config/vim-3.jpeg)

更多关于 `Vim Plug` 的使用参考：https://github.com/junegunn/vim-plug。
强烈推荐使用 [Vim Awesome](https://vimawesome.com/) 来搜索有哪些 vim 插件以及如何使用它们。另外这篇
Medium 上的文章 [10 essential Vim plugins](https://medium.com/@huntie/10-essential-vim-plugins-for-2018-39957190b7a9) 推荐了一些不错的插件，建议阅读。


### 结语

这篇文章对 Vim
的常用配置和插件做了简单的介绍，有兴趣的童鞋可以阅读文章中推荐的资料进一步深入学习。希望你的 Vim
用得越来越顺溜。
