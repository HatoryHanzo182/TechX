const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');

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

ipcMain.handle('AddNewProductToLocalStorage', (event, data) =>  // Handler for adding data to local storage
{       // ⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔
       // THE "FS" MODULE IS PART OF THE BUILT-IN NODE.JS LIBRARY AND IS DESIGNED TO WORK WITH THE FILE SYSTEM ON THE SERVER. 
      // IT IS NOT SUPPORTED IN THE BROWSER BECAUSE THE BROWSER DOES NOT HAVE ACCESS TO THE COMPUTER'S FILE SYSTEM FOR 
     // SECURITY REASONS.
    // ⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔
    const file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');
    let current_data = [];
    
    try 
    {
        current_data = JSON.parse(fs.readFileSync(file_path));
    } 
    catch (error) { return { success: false, message: "Error reading file" }; }

    current_data.push(data);

    try 
    {
        fs.writeFileSync(file_path, JSON.stringify(current_data, null, 2));
    } 
    catch (error) { return { success: false, message: "Error writing to file" }; }

    return { success: true, message: "Data saved successfully" };
});

ipcMain.handle('AddNewProductImgToLocalStorage', async (event, data) => 
{
    const product_img_folder_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'ProductsImg');

    if (!fs.existsSync(product_img_folder_path))
        fs.mkdirSync(product_img_folder_path);
    
    const new_img_paths = [];

    for (const img_path of data) 
    {
        const img_name = path.basename(img_path);
        const new_path = path.join(product_img_folder_path, img_name);

        fs.copyFileSync(img_path, new_path);
        
        new_img_paths.push(new_path);
    }

    const json_file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');
    
    let json_data = [];

    try 
    {
        json_data = JSON.parse(fs.readFileSync(json_file_path));
    } 
    catch (error) { console.error('Error reading JSON file:', error); }

    if (json_data.length > 0)
        json_data[json_data.length - 1].images = new_img_paths;

    try 
    {
        fs.writeFileSync(json_file_path, JSON.stringify(json_data, null, 2));
    } 
    catch (error) { console.error('Error writing JSON file:', error); }
});

ipcMain.handle('GetProductsFromLocalStorage', (event) => 
{
    const file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');
    let products = [];

    try 
    {
        const data = JSON.parse(fs.readFileSync(file_path));
        
        products = data;
    } 
    catch (error) { console.error('Error reading file: ', error); }

    return products;
});
  
ipcMain.handle('UpdateProductStatusInLocalStorage', async (event, new_status) => 
{
    const file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');

    try 
    {
        let products = JSON.parse(fs.readFileSync(file_path));
        const product_index = products.findIndex(product => product.model === new_status.model);    
        
        if (product_index !== -1) 
        {
            products[product_index].status = new_status.new_status; 
            
            fs.writeFileSync(file_path, JSON.stringify(products, null, 2)); 
            
            return { success: true, message: "Product status updated successfully" };
        } 
        else 
        {
            console.log('Product not found');
            return { success: false, message: "Product not found" };
        }
    } 
    catch (error) 
    {
        console.error('Error updating product status:', error);
        return { success: false, message: "Error updating product status" };
    }
});