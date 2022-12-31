# notes-helper

notes-helper 是使用 Nodejs 写的私人 Git 笔记小助手。

我常常苦恼现有的笔记软件要版本管理，又要支持 Markdown，还不希望受服务商的限制，于是别有了这个 notes-helper 脚本工具的想法。使用你喜欢的 Markdown 编辑器无论是 [typora](https://typora.io/) 、[Mark Text](https://marktext.app/) 还是 [vscode](https://code.visualstudio.com/)，都可以通过 notes-helper 在 Git 目录中自动同步到远端仓库（如：Github 、Gitlab等）。

*因为是用 Nodejs 写的，所以需要您已经安装了 Nodejs 环境。以后有空再用 Golang 或者 Rust 写个二进制文件体验应该会更好一点。*

## 创建配置文件

在对应的 Git 目录中创建 `.notes-helper.json` ，此处忽略了初始化等步骤。

```json
{
    "events": {
        "addDir": "touch .gitkeep && git add . && git commit -m 'notes add folder' && git push",
        "add": "git add . && git commit -m 'notes add file' && git push",
        "change": "git add . && git commit -m 'notes change file' && git push",
        "unlink": "git add . && git commit -m 'notes unlink' && git push"
    }
}
```

使用 [chokidar](https://github.com/paulmillr/chokidar) 监听目录变化，监听变化事件产生执行对应的 shell 命令。

将 `.notes-helper.json` 添加到版本控制

```shell
git add .notes-helper.json
git commit -m "chore: 添加 notes-helper 配置"
git push
```

之所以特殊说明需要添加配置文件到版本管理，原因是 notes-helper 会忽略掉以 `.`开头的文件变更，目前还是默认的忽略配置，等有时间再扩展这部分设置功能。



## 执行 notes-helper 命令

方法一：使用 `npx`，在对应的目录执行如下命令

```shell
npx @xbl/notes-helper
```

方法二：全局安装

```shell
npm install -g @xbl/notes-helper

# 在对应目录执行
@xbl/notes-helper
```
