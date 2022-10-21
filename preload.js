const { contextBridge, ipcRenderer } = require('electron')
const {TextView} = require('./src/webapp/TextView')

window.addEventListener('DOMContentLoaded', () => {
  const test = new TextView('D:\\FirstScene\\origin_file\\GLT_SUKAMULYA_CBN_CM_BXP_2051_telog.log', 'GLT_SUKAMULYA_CBN_CM_BXP_2051_telog')
  test.openFile()
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
