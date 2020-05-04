const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
// const isDev = require('electron-is-dev');

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
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', () => mainWindow = null);
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

