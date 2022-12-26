const { BrowserWindow } = require('electron/main')
const mySidebar = document.getElementById('mySidebar')



let isLeftMenuActive = true

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



showHideMenus.addEventListener('click', ()=> {
    if(!isLeftMenuActive) {
        mySidebar.style.width = '0px'
        isLeftMenuActive = true
        console.log(isLeftMenuActive);
    } else {
        mySidebar.style.width = '220px'
        isLeftMenuActive = false
        console.log(isLeftMenuActive);
    }
})