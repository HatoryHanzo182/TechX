const { app, BrowserWindow, Menu} = require('electron');
const path = require('path');

let _app_window;

function CreateAuthorizationWindow() 
{
    _app_window = new BrowserWindow(
    {
        width: 900,                 
        height: 700,      
        minWidth: 400,
        icon: 'src/img/icon.png',           
        webPreferences: { nodeIntegration: true},
        title: 'TechX Compass'
    });

    Menu.setApplicationMenu(null);  // Set the default menu to null.

    _app_window.loadFile(path.join(__dirname, 'src', 'components', 'Authorization.html'));
}

app.whenReady().then(CreateAuthorizationWindow);