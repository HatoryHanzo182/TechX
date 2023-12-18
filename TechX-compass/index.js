const { app, BrowserWindow } = require('electron');
const path = require('path');

let _app_window;

function CreateAuthorizationWindow() 
{
    _app_window = new BrowserWindow(
    {
        width: 800,                 
        height: 600,                 
        webPreferences: { nodeIntegration: true}
    });

    _app_window.loadFile(path.join(__dirname, 'src', 'components', 'Authorization.html'));
}

app.whenReady().then(CreateAuthorizationWindow);