const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 800,
    minHeight: 680,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname,'../renderer/main_window/preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// Minimize Application
ipc.on('minimizeApp', ()=> {
  mainWindow.minimize()
})

// Maximize and restore Application size
ipc.on('maximizeRestoreApp', ()=> {
  if(!mainWindow.isMaximized()) {
    mainWindow.maximize()
  } else {
    mainWindow.unmaximize()
  }
})

// Check if Maximized
mainWindow.on('maximize', ()=> {
mainWindow.webContents.send('isMaximized')
})

// Check if Restored
mainWindow.on('unmaximize', ()=> {
mainWindow.webContents.send('isRestored')
})

// Close Application  
ipc.on('closeApp', ()=> {
  mainWindow.close()
})

}

const createModal = () => {

  const modalWindow = new BrowserWindow({
    width: 800,
    height: 600,
    modal: true,  // Set the modal option to true
  // Set the parent option to the main window
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false
    }
  });
  modalWindow.loadFile(`src/views/selectedJob/selectedJob.html`)

}

ipc.on('open-modal-window', ()=> {
  createModal()
});


app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});