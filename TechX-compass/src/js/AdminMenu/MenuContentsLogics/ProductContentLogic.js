import { products_content, DisableContent, ShowErrorMessage, ShowSuccessMessage }  from "../AdminMenu.js";
import { IphoneDataModel } from "../ProductModels/IphoneDataModel.js";
import { MackbookDataModel } from "../ProductModels/MacbookDataModel.js";
import { IpadDataModel } from "../ProductModels/IpadDataModel.js";
import { AirpodsDataModel } from "../ProductModels/AirpodsDataModel.js";
import { WatchDataModel } from "../ProductModels/WatchDataModel.js";
import { ConsoleDataModel } from "../ProductModels/ConsoleDataModel.js";

//#region [Add product sector.]
//#region [Navigation sector.]
const create_products_content = document.getElementById("id-create-product-content");
const create_products_menu = document.getElementById("id-create-product-menu");
const create_products_content_phone = document.getElementById("id-content-phone-data");
const create_products_content_mackbook = document.getElementById("id-content-mackbook-data");
const create_products_content_ipad = document.getElementById("id-content-ipad-data");
const create_products_content_airpods = document.getElementById("id-content-airpods-data");
const create_products_content_watch = document.getElementById("id-content-watch-data");
const create_products_content_console = document.getElementById("id-content-console-data");

export function HideAllAddProductMenuItems()
{
    create_products_content.style.display = "none";
    manage_products_content.style.display = "none";
    create_products_content_phone.style.display = "none";
    create_products_content_mackbook.style.display = "none";
    create_products_content_ipad.style.display = "none";
    create_products_content_airpods.style.display = "none";
    create_products_content_watch.style.display = "none";
    create_products_content_console.style.display = "none";
}

function ShowContentProductCreation() 
{
  DisableContent();
  HideAllAddProductMenuItems();

  const first_r = document.querySelector('input[name="page"]');
  
  if (first_r)
    first_r.checked = true;

  create_products_content.style.display = "flex";
  create_products_menu.style.display = "flex";
  create_products_content_phone.style.display = "flex";
}

export function ShowContentProductIPhone()  // <--- Show IPhone content.
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
  create_products_content_phone.style.display = "flex";
}

function ShowContentProductMackbook()  // <--- Show Mackbook content.
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
  create_products_content_mackbook.style.display = "flex";
}

function ShowContentProductIpad()  // <--- Show IPad content.
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
  create_products_content_ipad.style.display = "flex";
}

function ShowContentProductAirpods()  // <--- Show AirPods content.
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
  create_products_content_airpods.style.display = "flex";
}

function ShowContentProductWatch()  // <--- Show Watch content.
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
  create_products_content_watch.style.display = "flex";
}

function ShowContentProductConsole()  // <--- Show Console content.
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
  create_products_content_console.style.display = "flex";
}

function BackToMainMenu()
{
  DisableContent();
  HideAllAddProductMenuItems();

  products_content.style.display = "flex";
}

document.getElementById("id-create-product").addEventListener("click", ShowContentProductCreation);
document.getElementById("id-create-product-content-phone").addEventListener("click", ShowContentProductIPhone);
document.getElementById("id-create-product-content-mackbook").addEventListener("click", ShowContentProductMackbook);
document.getElementById("id-create-product-content-ipad").addEventListener("click", ShowContentProductIpad);
document.getElementById("id-create-product-content-airpods").addEventListener("click", ShowContentProductAirpods);
document.getElementById("id-create-product-content-watch").addEventListener("click", ShowContentProductWatch);
document.getElementById("id-create-product-content-console").addEventListener("click", ShowContentProductConsole);
document.getElementById("id-back-to-product-menu").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu2").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu3").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu4").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu5").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu6").addEventListener("click", BackToMainMenu);
//#endregion

//#region [Sector for adding new product.]
async function AddIPhone() 
{
  const container = document.getElementById('id-content-phone-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if (empty_fields_flag) 
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`);
  else 
  {
    const new_iphone = new IphoneDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_iphone);
    const is_added = await new_iphone.AddToLocalStorage();

    if (is_added) 
    {
      inputs.forEach(input => { input.value = ''; });

      inputs[0].value = 'Apple'; 
      inputs[1].value = 'iPhone'; 

      while (drop_ul.firstChild)
        drop_ul.removeChild(drop_ul.firstChild);

      _img_product_paths_iphone = [];

      await FetchProducts();
      DisplayTable();
    }
  }
}

async function AddMacbook()
{
  const container = document.getElementById('id-content-mackbook-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox2');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if(empty_fields_flag)
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`)
  else
  {
    const new_macbook = new MackbookDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_mackbook);
    const is_added = await new_macbook.AddToLocalStorage();

    if (is_added) 
    {
      inputs.forEach(input => { input.value = ''; });

      inputs[0].value = 'Apple'; 
      inputs[1].value = 'Macbook'; 

      while (drop_ul2.firstChild)
        drop_ul2.removeChild(drop_ul2.firstChild);

      _img_product_paths_mackbook = [];

      await FetchProducts();
      DisplayTable();
    }
  }
}

async function AddIpad()
{
  const container = document.getElementById('id-content-ipad-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox3');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if(empty_fields_flag)
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`)
  else
  {
    const new_ipad = new IpadDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_ipad);
    const is_added = await new_ipad.AddToLocalStorage();

    if (is_added) 
    {
      inputs.forEach(input => { input.value = ''; });

      inputs[0].value = 'Apple'; 
      inputs[1].value = 'Ipad';   

      while (drop_ul3.firstChild)
        drop_ul3.removeChild(drop_ul3.firstChild);

      _img_product_paths_ipad = [];

            
      await FetchProducts();
      DisplayTable();
    }
  }
}

async function AddAirpods()
{
  const container = document.getElementById('id-content-airpods-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox4');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if(empty_fields_flag)
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`)
  else
  {
    const new_airpods = new AirpodsDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_airpods);
    const is_added = await new_airpods.AddToLocalStorage();

    if (is_added) 
    {
      inputs.forEach(input => { input.value = ''; });

      inputs[0].value = 'Apple'; 
      inputs[1].value = 'AirPods';   

      while (drop_ul4.firstChild)
        drop_ul4.removeChild(drop_ul4.firstChild);

      _img_product_paths_airpods = [];

      await FetchProducts();
      DisplayTable();
    }
  }
}

async function AddWatch()
{
  const container = document.getElementById('id-content-watch-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox5');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if(empty_fields_flag)
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`)
  else
  {
    const new_watch = new WatchDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_watch);
    const is_added = await new_watch.AddToLocalStorage();

    if (is_added) 
    {
      inputs.forEach(input => { input.value = ''; });
      
      inputs[1].value = 'Watch';   

      while (drop_ul5.firstChild)
        drop_ul5.removeChild(drop_ul5.firstChild);

      _img_product_paths_watch = [];

      await FetchProducts();
      DisplayTable();
    }
  }
}

async function AddConsole()
{
  const container = document.getElementById('id-content-console-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox6');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if(empty_fields_flag)
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`)
  else
  {
    const new_console = new ConsoleDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_console);
    const is_added = await new_console.AddToLocalStorage();

    if (is_added) 
    {
      inputs.forEach(input => { input.value = ''; });
      
      inputs[1].value = 'Console';   

      while (drop_ul6.firstChild)
        drop_ul6.removeChild(drop_ul6.firstChild);

      _img_product_paths_console = [];

      await FetchProducts();
      DisplayTable();
    }
  }
}

function CheckForEmptyLines(inputs)
{
  for(let i = 0; i < inputs.length; i++)
  {
    if(inputs[i].getAttribute('placeholder') === "Discount 'Not required to fill out'")
      continue;

    if(!inputs[i].value)
      return inputs[i].getAttribute('placeholder');
  }
}

document.getElementById("id-button-add-iphone").addEventListener("click", AddIPhone);
document.getElementById("id-button-add-macbook").addEventListener("click", AddMacbook);
document.getElementById("id-button-add-ipad").addEventListener("click", AddIpad);
document.getElementById("id-button-add-airpods").addEventListener("click", AddAirpods);
document.getElementById("id-button-add-watch").addEventListener("click", AddWatch);
document.getElementById("id-button-add-console").addEventListener("click", AddConsole);
//#endregion

//#region [Dragandrop sector.]
//#region [Dragandrop iPhone data srctor.]
const drop_area = document.getElementById('drop-area-iphone')
const custum_file_upload = document.getElementById('id-custum-file-upload-iphone')
const drop_ul = document.getElementById('id-drop-ul-iphone')
let _img_product_paths_iphone = [];

drop_area.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload.style.border = '2px dashed #000000';
});

drop_area.addEventListener('dragleave', (event) => { custum_file_upload.style.border = '2px dashed #cacaca'; });

drop_area.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;
    
    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');
    
    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_iphone.push(files[i].path);
    
    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul.removeChild(div)
      _img_product_paths_iphone.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul.appendChild(div)
  }
});
//#endregion
//#region [Dragandrop Mackbook data srctor.]
const drop_area2 = document.getElementById('drop-area-mackbook')
const custum_file_upload2 = document.getElementById('id-custum-file-upload-mackbook')
const drop_ul2 = document.getElementById('id-drop-ul-mackbook')
let _img_product_paths_mackbook = [];

drop_area2.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload2.style.border = '2px dashed #000000';
});

drop_area2.addEventListener('dragleave', (event) => { custum_file_upload2.style.border = '2px dashed #cacaca'; });

drop_area2.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload2.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;

    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');

    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_mackbook.push(files[i].path);

    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul2.removeChild(div)
      _img_product_paths_mackbook.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul2.appendChild(div)
  }
});
//#endregion
//#region [Dragandrop iPad data srctor.]
const drop_area3 = document.getElementById('drop-area-ipad')
const custum_file_upload3 = document.getElementById('id-custum-file-upload-ipad')
const drop_ul3 = document.getElementById('id-drop-ul-ipad')
let _img_product_paths_ipad = [];

drop_area3.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload3.style.border = '2px dashed #000000';
});

drop_area3.addEventListener('dragleave', (event) => { custum_file_upload3.style.border = '2px dashed #cacaca'; });

drop_area3.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload3.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;

    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');

    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_ipad.push(files[i].path);

    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul3.removeChild(div)
      _img_product_paths_ipad.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul3.appendChild(div)
  }
});
//#endregion
//#region [Dragandrop AirPods data srctor.]
const drop_area4 = document.getElementById('drop-area-airpods')
const custum_file_upload4 = document.getElementById('id-custum-file-upload-airpods')
const drop_ul4 = document.getElementById('id-drop-ul-airpods')
let _img_product_paths_airpods = [];

drop_area4.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload4.style.border = '2px dashed #000000';
});

drop_area4.addEventListener('dragleave', (event) => { custum_file_upload4.style.border = '2px dashed #cacaca'; });

drop_area4.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload4.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;

    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');

    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_airpods.push(files[i].path);

    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul4.removeChild(div)
      _img_product_paths_airpods.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul4.appendChild(div)
  }
});
//#endregion
//#region [Dragandrop Watch data srctor.]
const drop_area5 = document.getElementById('drop-area-watch')
const custum_file_upload5 = document.getElementById('id-custum-file-upload-watch')
const drop_ul5 = document.getElementById('id-drop-ul-watch')
let _img_product_paths_watch = [];

drop_area5.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload5.style.border = '2px dashed #000000';
});

drop_area5.addEventListener('dragleave', (event) => { custum_file_upload5.style.border = '2px dashed #cacaca'; });

drop_area5.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload5.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;

    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');

    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_watch.push(files[i].path);

    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul5.removeChild(div)
      _img_product_paths_watch.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul5.appendChild(div)
  }
});
//#endregion
//#region [Dragandrop Console data srctor.]
const drop_area6 = document.getElementById('drop-area-console')
const custum_file_upload6 = document.getElementById('id-custum-file-upload-console')
const drop_ul6 = document.getElementById('id-drop-ul-console')
let _img_product_paths_console = [];

drop_area6.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload6.style.border = '2px dashed #000000';
});

drop_area6.addEventListener('dragleave', (event) => { custum_file_upload6.style.border = '2px dashed #cacaca'; });

drop_area6.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload6.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;

    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');

    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_console.push(files[i].path);

    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul6.removeChild(div)
      _img_product_paths_console.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul6.appendChild(div)
  }
});
//#endregion
//#endregion

//#region [Api config]
function ShowApiWindow()
{
  console.log()
}

function OkApi()
{
  const api_window = document.getElementById("id-API-product-window");
  api_window.style.display = 'none';
  
  ShowApiWindow();
}

function CloseApiWindow()
{
  const api_window = document.getElementById("id-API-product-window");

  api_window.style.display = 'none';
}

document.getElementById("id-cancel-API").addEventListener("click", CloseApiWindow);
document.getElementById("id-API-OK").addEventListener("click", OkApi);
//#endregion 
//#endregion

//#region [Manage sector.]
//#region [Navigation sector.]
const manage_products_content = document.getElementById("id-manage-product-content");
const product_table = document.getElementById("id-table-container");
const change_product_w = document.getElementById("id-manage-product-change-content");
const modal_window_change_data = document.getElementById("id-manage-modal-change-data-product");

function ShowContentProductManage() 
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "none";
  create_products_menu.style.display = "none";
  change_product_w.style.display = "none";
  modal_window_change_data.style.display = "none";
  manage_products_content.style.display = "flex";
  product_table.style.display = "block";
}

function ShowProductChangeWindow()
{
  product_table.style.display = "none"; 
  change_product_w.style.display = "flex";
}

document.getElementById("id-manage-product").addEventListener("click", ShowContentProductManage);
document.getElementById("id-back-to-product-menu7").addEventListener("click", ShowContentProductManage);
//#endregion

//#region [Table logic sector.]
const rows_per_page = 12;
let current_page = 1;
let _products = [];

document.addEventListener('DOMContentLoaded', async () => 
{
  await FetchProducts();
  DisplayTable();

  document.getElementById('search').addEventListener('input', DisplayTable);
  document.getElementById('status-filter').addEventListener('change', DisplayTable);
  document.getElementById('prev').addEventListener('click', () => ChangePage(-1));
  document.getElementById('next').addEventListener('click', () => ChangePage(1));

  document.querySelector('#product-table tbody').addEventListener('click', function(event) 
  {
    if (event.target.classList.contains('tresh-meneger-product'))
      OnTrashIconClick.call(event.target);
    else if (event.target.classList.contains('bruch-meneger-product'))
      OnBrushIconClick.call(event.target);
  });
});

async function FetchProducts() 
{
  try 
  {
    const products = await window.electron.invoke('GetProductsFromLocalStorage');
    UpdateProductsArray(products);
  } 
  catch (error) { console.error('Error fetching products: ', error); }
}

function UpdateProductsArray(products) 
{
  _products = products.map(product => ({
    image: product.images[0],
    category: product.category,
    brand: product.brand,
    model: product.model,
    price: `${product.price}$`,
    discount: product.descont_price ? `${product.descont_price}$` : 'not discount',
    status: product.status
  }));
}

function DisplayTable() 
{
  const table_body = document.querySelector('#product-table tbody');
  const no_items_message = document.getElementById('no-items-message');
  
  table_body.innerHTML = '';

  const filtered_products = GetFilteredProducts();
  const start = (current_page - 1) * rows_per_page;
  const end = start + rows_per_page;
  const paginated_products = filtered_products.slice(start, end);

  if (paginated_products.length === 0) 
  {
    no_items_message.style.display = 'block';
    
    UpdatePaginationInfo(0);
  } 
  else 
  {
    no_items_message.style.display = 'none';
    
    paginated_products.forEach((product, index) => 
    {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td><img src="${product.image}" alt="${product.model}" style="width: 50px; height: 50px;"></td>
        <td>${product.category}</td>
        <td>${product.brand}</td>
        <td>${product.model}</td>
        <td>${product.price}</td>
        <td>${product.discount}</td>
        <td>
          <select class="status-dropdown">
            <option value="active" ${product.status === 'active' ? 'selected' : ''}>Activate</option>
            <option value="no active" >Deactivate</option>
          </select>
        </td>
        <td><ion-icon class="bruch-meneger-product" name="brush-outline"></ion-icon></td>
        <td><ion-icon name="trash-outline" class="tresh-meneger-product"></ion-icon></td>
      `;

      table_body.appendChild(row);
    });

    UpdatePaginationInfo(filtered_products.length);
  }

  document.querySelectorAll('.status-dropdown').forEach((dropdown, index) => 
  {
    dropdown.value = _products[start + index].status;

    dropdown.addEventListener('change', OnStatusChange);
  });
}

async function OnTrashIconClick() 
{
  const row = this.closest('tr');
  const selected_brand = row.querySelectorAll('td')[2].textContent;
  const selected_model = row.querySelectorAll('td')[3].textContent;
  const product_index = _products.findIndex(product => product.model === selected_model && product.brand === selected_brand);

  if (product_index !== -1) 
  {
    const product = _products[product_index];
    
    ConfirmDeletingProductFromTable().then(async confirmation => 
    {
      if (confirmation) 
      {
        const response = await window.electron.invoke('DeleteProductFromLocalStorage', 
        { 
          brand: product.brand, 
          model: product.model, 
        });
    
        if (response.success) 
        {
          if (product.status === "active")
          {
            const del_product = { category: product.category, model: product.model };

            await RemoveProductFromDB(del_product);
          }
    
          ShowSuccessMessage("The product has been removed");
          await FetchProducts();
          DisplayTable();
        } 
        else 
        {
          //ShowErrorMessage(response.message);
          console.error('Error deleting product:', response.message);
        }
      } 
    });
  }
}

async function OnBrushIconClick() 
{
  _deleted_img = [];

  const row = this.closest('tr');
  const selected_brand = row.querySelectorAll('td')[2].textContent;
  const selected_model = row.querySelectorAll('td')[3].textContent;

  try 
  {
    const response = await window.electron.invoke('FindProductDetails', { brand: selected_brand, model: selected_model });

    if (response.success) 
    {
      const product = response.product;
      const product_info_container = document.getElementById('product-info');
      const product_images_container = document.getElementById('product-images');

      product_info_container.innerHTML = '';
      product_images_container.innerHTML = '';

      _brand = product.brand;
      _category = product.category;
      _model = product.model;
      _status = product.status;

      Object.keys(product).forEach(key => 
      {
        const key_t = key.charAt(0).toUpperCase() + key.slice(1);

        if (key !== 'images' && product[key] !== null && product[key] !== undefined) 
        {
          if(key_t === 'Brand' || key_t === 'Category' || key_t === 'Model' || key_t === 'Status')
            return;
          
          const div = document.createElement('div');
          
          if (key_t === 'Incarousel') 
          {
            div.innerHTML = `
              <div class="check-sector">
                <p>Add in carousel</p>
                <label class="container-check">
                  <input id="id-incarousel-checkbox-change-product" type="checkbox" ${product[key] ? 'checked' : ''}>
                  <div class="checkmark"></div>
                </label>
              </div>`;
          
            const checkbox = div.querySelector('#id-incarousel-checkbox-change-product');

            _new_carousel = checkbox.checked;

            checkbox.addEventListener('change', function () { _new_carousel = this.checked; });
          }
          else 
          {
            div.innerHTML = `
              <div class="change-product-data">
                <label>${key_t}:</label>
                <input class="card-content-product-data-input" name="text" type="text" value="${product[key]}" />
              </div>`;
          }
          
          product_info_container.appendChild(div);
        }
      });

      product.images.forEach(image_path => 
      {
        const image_container = document.createElement('div');
        
        image_container.classList.add('image-container');

        const img = document.createElement('img');
        
        img.src = image_path;
        img.classList.add('product-image');

        const trash_icon = document.createElement('div');
        
        trash_icon.classList.add('trash-icon');
        trash_icon.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
        trash_icon.addEventListener('click', () => RemoveImage(image_path, image_container));
        image_container.appendChild(img);
        image_container.appendChild(trash_icon);
        product_images_container.appendChild(image_container);
      });

      ShowProductChangeWindow();
    }
  } 
  catch (error) { console.error('Error fetching product details: ', error); }
}

function ConfirmDeletingProductFromTable() 
{
  const modal_window = document.getElementById('id-manage-delete-product');
  modal_window.style.display = "flex";

  return new Promise((resolve, reject) => 
  {
    const delete_button = document.getElementById('id-menege-delete');
    const cancel_button = document.getElementById('id-menege-cancel');

    delete_button.addEventListener('click', () => 
    {
      modal_window.style.display = "none";
      
      resolve(true);
    });

    cancel_button.addEventListener('click', () => 
    {
      modal_window.style.display = "none";
      
      resolve(false); 
    });
  });
}

function OnStatusChange() 
{
  const selected_model = this.closest('tr').querySelectorAll('td')[3].textContent;
  const new_status = this.value;
  const product_index = _products.findIndex(product => product.model === selected_model);

  if (product_index !== -1) 
  {
    _products[product_index].status = new_status;

    UpdateProductStatusInLocalStorage(selected_model, new_status);
  }
}

async function UpdateProductStatusInLocalStorage(model, new_status) 
{
  try 
  {
    const new_status_data = { model: model, new_status: new_status };
    const u = await window.electron.invoke('UpdateProductStatusInLocalStorage', new_status_data);

    if (u.success) 
    {
      if (new_status === 'active')
        await AddProduct(u.product);
      else
        await RemoveProductFromDB(u.product);

      await FetchProducts();
      DisplayTable();
    }
  } 
  catch (error) { console.error('Error updating product status:', error); }
}

function GetFilteredProducts() 
{
  const search_query = document.getElementById('search').value.toLowerCase();
  const status_filter = document.getElementById('status-filter').value;

  return _products.filter(product => (product.model.toLowerCase().includes(search_query) || product.brand.toLowerCase().includes(search_query)) && (status_filter === '' || product.status === status_filter));
}

function UpdatePaginationInfo(total_rows) 
{
  const total_pages = Math.ceil(total_rows / rows_per_page);

  document.getElementById('page-info').innerText = total_rows === 0 ? 'No items available' : `Page ${current_page} of ${total_pages}`;
  document.getElementById('prev').disabled = current_page === 1 || total_pages === 0;
  document.getElementById('next').disabled = current_page === total_pages || total_pages === 0;
}

function ChangePage(direction) 
{
  current_page += direction;

  DisplayTable();
}

async function AddProduct(product)
{
  let img_path_genirated_server = [];

  for (const image_path of product.images) 
  {
    try 
    {
      const response = await fetch(image_path);
      const file_blob = await response.blob();
      const file = new File([file_blob], image_path.split('/').pop());
      const form_data = new FormData();

      form_data.append('image', file);

      const upload_response = await fetch("https://techx-server.tech:443/api/product/AddNewProductImg", 
      {
        method: 'POST',
        body: form_data,
      });

      if (!upload_response.ok)
        throw new Error('Failed to upload image');
      else
      {
        const data = await upload_response.json();
        
        img_path_genirated_server.push(...data.file_names);
      }
    } 
    catch (error) { console.error('Error uploading image:', error); }
  }
  
  const new_produc_object = { product, server_img: img_path_genirated_server };

  console.log(new_produc_object);

  const res_user_exists = await fetch("https://techx-server.tech:443/api/product/AddProduct",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(new_produc_object)
  });
  
  if (res_user_exists.ok)
    ShowSuccessMessage("Product added to the site");
  else
    ShowErrorMessage(res_user_exists.message);
}

function RemoveProductFromDB(product)
{
  fetch('https://techx-server.tech:443/api/product/RemoveProductFromDB', 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category: product.category, model: product.model })
  })
  .then(response => response.json())
  .then(data => 
  {
    if (data.success)
      ShowSuccessMessage(`${data.message}`);
  })
  .catch(error => { console.error('Error:', error); });
}

document.getElementById("id-back-to-product-menu8").addEventListener("click", BackToMainMenu);
document.getElementById("id-button-change-product-data").addEventListener("click", ShowModaForChangeData);
//#endregion

//#region [Change logic.]
let _deleted_img = [];
let _img_product_paths_change_data7 = [];
let _new_carousel;
let _brand, _category, _model, _status;

function ShowModaForChangeData()
{
  modal_window_change_data.style.display = "flex";
}

function CancelModaForChangeData()
{
  modal_window_change_data.style.display = "none";
}

function RemoveImage(image_path, image_container) 
{
  const product_images_container = document.getElementById('product-images');
  
  product_images_container.removeChild(image_container);

  _deleted_img.push(image_path);
}

async function ChangeDataProduct()
{
  const product_info_container = document.getElementById('product-info');
  const inputs = product_info_container.querySelectorAll('input[type="text"]');
  const new_data = 
  {
    Brand: _brand,
    Category: _category,
    Model: _model,
    Status: _status
  };

  inputs.forEach(input => 
  {
    const key = input.previousElementSibling.textContent.replace(':', '').trim();

    new_data[key] = input.value;
  });

  const data = {_deleted_img, _img_product_paths_change_data7, _new_carousel, new_data}

  await window.electron.invoke('UpdateCangeProductData', data).then(response => 
  {
    
    if(response.success)
    {
      ShowSuccessMessage(response.message);

      while (drop_ul7.firstChild)
        drop_ul7.removeChild(drop_ul7.firstChild);

      _img_product_paths_change_data7 = [];

      UpdateProductStatusInLocalStorage(data.new_data.Model, response.status)
      ShowContentProductManage();
    }
    // else
    //   ShowErrorMessage(response.message);

  })
  .catch(error => { console.error("Error sending data to main process: ", error);});
}

document.getElementById("id-menege-cancel-change").addEventListener("click", CancelModaForChangeData);
document.getElementById("id-menege-change").addEventListener("click", ChangeDataProduct);

//#region [Dragandrop change product data srctor.]
const drop_area7 = document.getElementById('drop-area-change-data');
const custum_file_upload7 = document.getElementById('id-custum-file-upload-change-data');
const drop_ul7 = document.getElementById('id-drop-ul-change-data');

drop_area7.addEventListener('dragover', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload7.style.border = '2px dashed #000000';
});

drop_area7.addEventListener('dragleave', (event) => { custum_file_upload7.style.border = '2px dashed #cacaca'; });

drop_area7.addEventListener('drop', (event) => 
{
  event.stopPropagation();
  event.preventDefault();

  custum_file_upload7.style.border = '2px dashed #cacaca';

  const files = event.dataTransfer.files;

  for (let i = 0; i < files.length; i++) 
  {
    if (!files[i].type.startsWith('image/')) 
      continue;
    
    const child = document.createElement('li');
    const rm_icon = document.createElement('ion-icon');
    const div = document.createElement('div');
    const image_icon = document.createElement('ion-icon');
    
    image_icon.setAttribute('name', 'image');
    image_icon.id = 'id-drop-image';
    div.id = 'id-drop-div';
    rm_icon.setAttribute('name', 'trash');
    rm_icon.id = 'id-drop-trash'
    child.id = 'id-drop-li'
    child.textContent = files[i].path;
    
    _img_product_paths_change_data7.push(files[i].path);
    
    rm_icon.onclick = () => 
    { 
      div.removeChild(image_icon)
      div.removeChild(child)
      div.removeChild(rm_icon)
      drop_ul7.removeChild(div)
      _img_product_paths_change_data7.splice(i, 1);
    }

    div.appendChild(image_icon)
    div.appendChild(child)
    div.appendChild(rm_icon)
    drop_ul7.appendChild(div)
  }
});
//#endregion
//#endregion
//#endregion