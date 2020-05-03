const electron = require('electron');
const ipc = require('electron').ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    electron.Menu.setApplicationMenu(false);
    mainWindow = new BrowserWindow({
        width: 240,
        height: 170,
        fullscreen: false,
        resizable: false, 
        alwaysOnTop: true,
        // frame: false
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
    // mainWindow.setMenuBarVisibility(false);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipc.on('invokeAction', function (event, data) {
    console.log(data);
    event.sender.send('actionReply', 'data processed');
});
