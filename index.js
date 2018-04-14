const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const testIrc = require('./app/irc');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(
    url.format({
      pathname: 'localhost:8080',
      protocol: 'http:',
      slashes: true,
    }),
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  testIrc();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
