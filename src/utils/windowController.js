const { BrowserWindow } = require('electron/main')
const mySidebar = document.getElementById('mySidebar')




// Minimize button
minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})

// Maximize/Restore button
maxResBtn.addEventListener('click', ()=> {
    ipc.send('maximizeRestoreApp')
})

// Close button
closeBtn.addEventListener('click', ()=> {
    ipc.send('closeApp')
})
