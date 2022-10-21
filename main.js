const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools()
  nativeTheme.themeSource = 'dark'
  win.on('close',() => {
    win = null
  })
  win.on('resize',() => {
    win.reload();
  })

}

app.on('ready',createWindow);

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate',() => {
  if(win == null){
      createWindow();
  }
})