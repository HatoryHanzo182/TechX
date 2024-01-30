const { contextBridge, ipcRenderer } = require('electron');

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  * File preload.js allows you to safely provide an interface between the main and render processes. 
  * In Electron, the main process manages your application's main window, and the rendering process 
  * is responsible for displaying the user interface in that window. Due to the differences 
  * in security between these processes, using contextBridge helps prevent dangerous operations 
  * such as accessing the Node.js API from the rendering process.
*/

contextBridge.exposeInMainWorld('electron', 
{
  send: (channel, data) => { ipcRenderer.send(channel, data); },
  receive: (channel, func) => { ipcRenderer.on(channel, (event, ...args) => func(...args)); }
});