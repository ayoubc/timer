const electron = require('electron');
const ipc = require('electron').ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 240,
        height: 170,
        // resizable: false, 
        alwaysOnTop: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "render.js")
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
    //   console.log(remote.getCurrentWindow());
    // remote.getCurrentWindow().close();

    console.log(electron.screen.getAllDisplays());
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
