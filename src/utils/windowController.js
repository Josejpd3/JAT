const { BrowserWindow } = require('electron/main')

// Minimize button
minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})

