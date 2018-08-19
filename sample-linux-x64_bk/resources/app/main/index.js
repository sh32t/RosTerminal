// Electron�̃��W���[��
const electron = require("electron");
// �A�v���P�[�V�������R���g���[�����郂�W���[��
const app = electron.app;
// �E�B���h�E���쐬���郂�W���[��
const BrowserWindow = electron.BrowserWindow;
// ���C���E�B���h�E�̓K�x�[�W�R���N�V��������Ȃ��悤�ɃO���[�o���錾
let mainWindow;

// �S�ẴE�B���h�E��������I��
app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});

// Electron�̏�����������Ɏ��s
app.on("ready", () => {
    //�E�B���h�E�T�C�Y��1280*720�i�t���[���T�C�Y���܂܂Ȃ��j�ɐݒ肷��
    mainWindow = new BrowserWindow({ height: 300, width: 600, resizable: false });
    //�g�p����html�t�@�C�����w�肷��
    mainWindow.loadURL(`file://${__dirname}/../view/html/index.html`);

    // �E�B���h�E������ꂽ��A�v�����I��
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


// ROS�ւ̎w�ߏ���
const { ipcMain } = require("electron")
const dirPath = "sh/"
// �v���Z�X
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
