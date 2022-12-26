const { BrowserWindow } = require('electron/main')

// Minimize button
minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})

// Maximize/Restore button
maxResBtn.addEventListener('click', ()=> {
    ipc.send('maximizeRestoreApp')
})

