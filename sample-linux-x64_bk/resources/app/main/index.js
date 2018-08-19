// Electronのモジュール
const electron = require("electron");
// アプリケーションをコントロールするモジュール
const app = electron.app;
// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;
// メインウィンドウはガベージコレクションされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});

// Electronの初期化完了後に実行
app.on("ready", () => {
    //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
    mainWindow = new BrowserWindow({ height: 300, width: 600, resizable: false });
    //使用するhtmlファイルを指定する
    mainWindow.loadURL(`file://${__dirname}/../view/html/index.html`);

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on("closed", () => {
        mainWindow = null;
        procKill = require("child_process").execFile("sh", [dirPath + "kill.sh"], (err, stdout, stderr) => {
            procStart.kill('SIGINT');
            procStop.kill('SIGINT');
            procRestart.kill('SIGINT');
            procSpeed.kill('SIGINT');
            procKill.kill('SIGINT');
        });
    });
});


// ROSへの指令処理
const { ipcMain } = require("electron")
const dirPath = "sh/"
// プロセス
var procStart;
ipcMain.on("start", (event) => {
    procStart = require("child_process").spawn("sh", [dirPath + "start.sh"]);
});
var procKill;
ipcMain.on("kill", (event, arg) => {
    procKill = require("child_process").spawn("sh", [dirPath + "kill.sh"]);
});
var procStop;
ipcMain.on("stop", (event, arg) => {
    procStop = require("child_process").spawn("sh", [dirPath + "stop.sh"]);
});
var procRestart;
ipcMain.on("restart", (event, arg) => {
    procRestart = require("child_process").spawn("sh", [dirPath + "restart.sh", arg]);
});
var procSpeed;
ipcMain.on("speed", (event, arg) => {
    procSpeed = require("child_process").spawn("sh", [dirPath + "speed.sh", arg]);
});
