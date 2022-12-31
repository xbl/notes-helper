#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('path');
const { cwd } = require('node:process');

const chokidar = require('chokidar');
const shell = require('shelljs');

const notesFolder = cwd();
console.log(`Current directory: ${notesFolder}`);

const CONFIG_FILE_NAME = '.notes-helper.json';

async function loadConfig (notesFolder) {
    const str = await fs.readFile(path.join(notesFolder, CONFIG_FILE_NAME));
    return JSON.parse(str);
};

async function main() {
    let config = {};
    try {
        config = await loadConfig(notesFolder);
    } catch (error) {
        console.error(`Error: 加载配置文件失败！`);
        process.exit(1);
    }
    
    const watcher = chokidar.watch(notesFolder, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        ignoreInitial: true,
    });

    Object.keys(config.events).forEach(key => {
        watcher.on(key, async changePath => {
            console.log(`变化的文件或者目录：${changePath}`);

            let cwdPath = path.dirname(changePath);
            if (key == 'addDir') {
                cwdPath = changePath;
            }
            if (key === 'unlink') {
                cwdPath = path.resolve(cwdPath, '../');
                console.log(`如果是删除应该走上一个目录执行：${cwdPath}`);
            }

            const cmd = config.events[key];
            console.log(`执行的命令：cd ${cwdPath} && ${cmd}`);

            shell.exec(`cd ${cwdPath} && ${cmd}`);
        });
    });
}

main();


