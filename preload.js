const { contextBridge, ipcRenderer } =require('electron')

window.addEventListener('DOMContentLoaded', () => {

  // electron.openおよびelectron.saveをレンダラープロセスに追加
  contextBridge.exposeInMainWorld('electron', {
    open: () => ipcRenderer.invoke('open'),
    save: data => ipcRenderer.invoke('save', data)
  })

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
