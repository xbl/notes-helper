# notes-helper

是使用 Nodejs 写的笔记小助手，在 Git 目录中自动同步到远端仓库的脚本工具



## 创建配置文件

在对应的 Git 目录中创建 `.note-helper.json` 

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

此处忽略了 git 初始化等操作。




