const { app, BrowserWindow } = require("electron");
const path = require('path');

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  if (process.env.NODE_ENV === "local") {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }
}

app.on("ready", createWindow);
