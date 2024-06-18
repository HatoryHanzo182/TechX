const { app, BrowserWindow, Menu, ipcMain, Tray} = require('electron');
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
let _tray;  // Tray context menu.

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

//#region [Context menu sector]
let review_count = 0; 
let order_count = 0; 

function CreateTray() 
{
    _tray = new Tray(path.join(__dirname, 'src', 'img', 'icon.png'));
  
    const context_menu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => { _app_window.show(); }
    },
    {
        label: order_count === 0 ? 'Order' : `(${order_count}) Order`,
        click: () => 
        { 
            order_count = 0;

            UpdateContextMenu();
            
            _app_window.show();
            _app_window.webContents.send('ShowOrder');
        }
    },
    {
        label: review_count === 0 ? 'Reviews' : `(${review_count}) Reviews`,
        click: () => 
        { 
            review_count = 0;

            UpdateContextMenu();
            
            _app_window.show();
            _app_window.webContents.send('ShowReview');
        }
    },
    {
        label: 'Block',
        click: () => {  _app_window.loadFile(path.join(__dirname, 'src', 'components', 'Authorization.html')); }
    },
    {
      label: 'Close',
      click: () =>
      { 
        app.quit();
        _tray.destroy(); 
      }
    }]);

    _tray.setToolTip('TechX-compass');
    _tray.setContextMenu(context_menu);
    _tray.on('click', () => { _app_window.show(); });
    _app_window.on('close', (event) => 
    {
      if(!app.isQuitting)
      {
        event.preventDefault();
        _app_window.hide();
      }
    });
}

function UpdateContextMenu() 
{
    const context_menu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => { _app_window.show(); }
    },
    {
        label: order_count === 0 ? 'Order' : `(${order_count}) Order`,
        click: () => 
        { 
            order_count = 0;

            UpdateContextMenu();
            
            _app_window.show();
            _app_window.webContents.send('ShowOrder');
        }
    },
    {
        label: review_count === 0 ? 'Reviews' : `(${review_count}) Reviews`,
        click: () => 
        { 
            review_count = 0;

            UpdateContextMenu();
            
            _app_window.show();
            _app_window.webContents.send('ShowReview');
        }
    },
        {
        label: 'Block',
        click: () => {  _app_window.loadFile(path.join(__dirname, 'src', 'components', 'Authorization.html')); }
    },
    {
      label: 'Close',
      click: () =>
      { 
        app.quit();
        _tray.destroy(); 
      }
    }
    ]);

    _tray.setContextMenu(context_menu);
}
//#endregion

//#region [Requests for render processes.]
ipcMain.on('UpdateReviewCountForContextMenu', (event, new_review_count) => 
{
    review_count = new_review_count;

    UpdateContextMenu();
});

ipcMain.on('UpdateOrderCountForContextMenu', (event, new_order_count) => 
{
    order_count = new_order_count;

    UpdateContextMenu();
});
//#endregion

app.whenReady().then(() =>  // An event handler that executes when 
{                          // the application is ready for use.
    CreateMainWindow();
    CreateTray();
    
    ipcMain.on('ShowAdminPanel', () => { _app_window.loadFile(path.join(__dirname, 'src', 'components', 'AdminMenu.html')); });
    ipcMain.on('ShowAuthorization', () => { _app_window.loadFile(path.join(__dirname, 'src', 'components', 'Authorization.html')); });
});

//#region [Requests for working with goods.]
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

ipcMain.handle('AddNewProductImgToLocalStorage', async (event, data) =>  // Add new product images to local storage. 
{           // It creates a folder for the product images, copies the images to that folder, updates the corresponding 
           // JSON file with product information including the new image paths.
          // If something goes wrong while reading or writing files, it catches and prints an error.
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

ipcMain.handle('GetProductsFromLocalStorage', (event) =>  // Processes a request to retrieve products from local storage. 
{               // It reads a JSON file containing product information from the specified path, then parses it and 
               // returns an array of products. If an error occurs while reading the file, the code displays an error message.
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

ipcMain.handle('FindProductDetails', (event, data) => 
{
    const { brand, model } = data;
    const file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');
  
    try 
    {
        const products = JSON.parse(fs.readFileSync(file_path));
        const product = products.find(p => p.brand === brand && p.model === model);
        
        if (product) 
          return { success: true, product };
        else
          return { success: false, message: 'Product not found' };
    } 
    catch (error) 
    {
      console.error('Error reading file: ', error);
      return { success: false, message: 'Error reading file' };
    }
});

ipcMain.handle('UpdateProductStatusInLocalStorage', async (event, new_status) =>  // Reads a JSON file containing product information
{                                           // from the specified path, then finds the index of the product with the given model. 
                                           // If the product is found, it updates its status according to the new status passed in and 
                                          // writes the changes back to the file. When the operation completes, it returns 
                                         // an object with information about the success of the operation and the updated product,
                                        // or an error message if problems occur.
    const file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');

    try 
    {
        let products = JSON.parse(fs.readFileSync(file_path));
        const product_index = products.findIndex(product => product.model === new_status.model);    
        
        if (product_index !== -1) 
        {
            products[product_index].status = new_status.new_status; 
            
            fs.writeFileSync(file_path, JSON.stringify(products, null, 2)); 
            
            return { success: true, product: products[product_index] };
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

ipcMain.handle('DeleteProductFromLocalStorage', (event, data) =>  // Processes a request to remove a product from local storage. 
{                                       // It first reads a JSON file containing product information from the specified path,
                                       // then finds the product based on the given brand and model. If the product is not found,
                                      // it returns an error message. Otherwise, it removes the product from the data,
                                     // overwrites the JSON file without the removed product, and removes the corresponding product images
                                    // from the images folder. When the operation completes, it returns an object indicating 
                                   // whether the operation was successful or an error message if problems occurred.
    const { brand, model } = data;
    const file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');
    const product_img_folder_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'ProductsImg');
    let current_data = [];

    try 
    {
        current_data = JSON.parse(fs.readFileSync(file_path));
    } 
    catch (error) { return { success: false, message: "Error reading file" }; }

    const product = current_data.find(product => product.brand === brand && product.model === model);

    if (!product)
        return { success: false, message: "Product not found" };

    const image_paths = product.images;
    const new_data = current_data.filter(product => product.brand !== brand || product.model !== model);

    try 
    {
        fs.writeFileSync(file_path, JSON.stringify(new_data, null, 2));
    } 
    catch (error) { return { success: false, message: "Error writing to file" }; }

    for (const img_path of image_paths) 
    {
        try 
        {
            fs.unlinkSync(img_path);
        } 
        catch (error) { console.error(`Error deleting image ${img_path}:`, error); }
    }

    return { success: true, message: "Product and images deleted successfully" };
});

ipcMain.handle('UpdateCangeProductData', async (event, data) =>  // Handler for updating product data in the local storage JSON file. This method:
{                                 // - Reads the current data from the JSON file.
                                 // - Finds the product based on brand, category, and model.
                                // - Deletes specified images from the product's image list and filesystem.
                               // - Adds new images to the product's image list and copies them to the local storage folder.
                              // - Updates product details and status.
                             // - Saves the updated product data back to the JSON file.
                            // - Returns a success or error message indicating the result of the operation.
    try 
    {
        const json_file_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'product_assembly.json');
        const file_content = await fs.promises.readFile(json_file_path, 'utf8');
        const products = JSON.parse(file_content);
        const { _deleted_img, _img_product_paths_change_data7, _new_carousel, new_data } = data;
        const product_index = products.findIndex(product =>
            product.brand === new_data.Brand &&
            product.category === new_data.Category &&
            product.model === new_data.Model
        );

        if (product_index !== -1) 
        {
            const product = products[product_index];

            _deleted_img.forEach(image_path => 
            {
                const image_index = product.images.indexOf(image_path);

                if (image_index !== -1) 
                {
                    product.images.splice(image_index, 1);

                    try { fs.unlinkSync(image_path); } 
                    catch (error) { console.error(`Error deleting image file: ${image_path}`, error); }
                }
            });

            const product_img_folder_path = path.join(__dirname, 'src', 'CompassLocalStorage', 'ProductsImg');

            if (!fs.existsSync(product_img_folder_path)) 
                fs.mkdirSync(product_img_folder_path);

            const new_img_paths = [];

            for (const img_path of _img_product_paths_change_data7) 
            {
                const img_name = path.basename(img_path);
                const new_path = path.join(product_img_folder_path, img_name);

                try 
                {
                    fs.copyFileSync(img_path, new_path);
                    new_img_paths.push(new_path);
                } 
                catch (error) { console.error('Error copying new image file:', error); }
            }

            product.images = [...product.images, ...new_img_paths];
            product.incarousel = _new_carousel;
            product.status = "no active";

            Object.keys(new_data).forEach(key => 
            {
                if (key !== 'Brand' && key !== 'Category' && key !== 'Model' && key !== 'Status') 
                {
                    product[key.toLowerCase()] = new_data[key];
                    console.log(key.toLowerCase());
                }
            });

            await fs.promises.writeFile(json_file_path, JSON.stringify(products, null, 2), 'utf8');

            return { success: true, message: 'Product data updated successfully', status: product.status  };
        } 
        else 
            return { success: false, message: 'Product not found'};
    } 
    catch (error) 
    {
        console.error('Error updating product data:', error);
        return { success: false, message: 'Failed to update product data', error };
    }
});
//#endregion

app.on('activate', () => 
{
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow();
});