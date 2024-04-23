const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');

//
//   ████████╗███████╗ █████╗ ██╗  ██╗██╗  ██╗    
//   ╚══██╔══╝██╔════╝██╔══██╗██║  ██║╚██╗██╔╝    
//      ██║   █████╗  ██║  ╚═╝███████║ ╚███╔╝     
//      ██║   ██╔══╝  ██║  ██╗██╔══██║ ██╔██╗     
//      ██║   ███████╗╚█████╔╝██║  ██║██╔╝╚██╗    
//      ╚═╝   ╚══════╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝    
//  
//    █████╗  █████╗ ███╗   ███╗██████╗  █████╗  ██████╗ ██████╗
//   ██╔══██╗██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔════╝██╔════╝
//   ██║  ╚═╝██║  ██║██╔████╔██║██████╔╝███████║╚█████╗ ╚█████╗ 
//   ██║  ██╗██║  ██║██║╚██╔╝██║██╔═══╝ ██╔══██║ ╚═══██╗ ╚═══██╗
//   ╚█████╔╝╚█████╔╝██║ ╚═╝ ██║██║     ██║  ██║██████╔╝██████╔╝
//    ╚════╝  ╚════╝ ╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═════╝ 
//
// index.js is a file that represents the primary process (main process) 
// that manages the life cycle of the application. 
// This process creates the application's main window and can perform operations that need to
// be performed once for the entire application.
//

let _app_window;  // Main window of the admin panel.

function CreateMainWindow() 
{
    _app_window = new BrowserWindow(
    {
        width: 900,                 
        height: 700,      
        minWidth: 400,
        icon: 'src/img/icon.png',           
        webPreferences: 
        {
          nodeIntegration: false,
          contextIsolation: true,
          preload: path.join(__dirname, 'preload.js')
        },
        title: 'TechX Compass'
    });

    Menu.setApplicationMenu(null);  // Set the default menu to null.

    _app_window.loadFile(path.join(__dirname, 'src', 'components', 'AdminMenu.html'));
    _app_window.webContents.openDevTools();   // <-----  DevTools.
}

app.whenReady().then(() =>  // An event handler that executes when 
{                          // the application is ready for use.
    CreateMainWindow();
    
    ipcMain.on('ShowAdminPanel', () => { _app_window.loadFile(path.join(__dirname, 'src', 'components', 'AdminMenu.html')); });
    ipcMain.on('ShowAuthorization', () => { _app_window.loadFile(path.join(__dirname, 'src', 'components', 'Authorization.html')); });
});