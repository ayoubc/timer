const { remote, ipcRenderer } = require('electron')

document.querySelector(".close").addEventListener("click", () => {
    console.log(remote.getCurrentWindow())
    remote.getCurrentWindow().minimize();
})



