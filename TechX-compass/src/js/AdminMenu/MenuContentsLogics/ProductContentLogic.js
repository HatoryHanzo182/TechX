import { products_content, DisableContent, ShowErrorMessage }  from "../AdminMenu.js";
import { IphoneDataModel } from "../ProductModels/IphoneDataModel.js";
import { MackbookDataModel } from "../ProductModels/MacbookDataModel.js";
import { IpadDataModel } from "../ProductModels/IpadDataModel.js";

//#region [Products tab add product navigation.]
const create_products_content = document.getElementById("id-create-product-content");
const create_products_content_phone = document.getElementById("id-content-phone-data");
const create_products_content_mackbook = document.getElementById("id-content-mackbook-data");
const create_products_content_ipad = document.getElementById("id-content-ipad-data");

export function HideAllAddProductMenuItems()
{
    create_products_content.style.display = "none";
    create_products_content_phone.style.display = "none";
    create_products_content_mackbook.style.display = "none";
    create_products_content_ipad.style.display = "none";
}

function ShowContentProductCreation() 
{
  DisableContent();
  HideAllAddProductMenuItems();

  create_products_content.style.display = "flex";
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
document.getElementById("id-back-to-product-menu").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu2").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu3").addEventListener("click", BackToMainMenu);
//#endregion

//#region [Sector for adding new product.]
function AddIPhone() 
{
  const container = document.getElementById('id-content-phone-data');
  const inputs = container.querySelectorAll('.card-content-product-data-input');
  const in_carousel_checkbox = container.querySelector('#id-incarousel-ceckbox');
  let empty_fields_flag = CheckForEmptyLines(inputs);

  if(empty_fields_flag)
    ShowErrorMessage(`Field (${empty_fields_flag}) should not be empty`)
  else
  {
    const new_iphone = new IphoneDataModel(inputs, in_carousel_checkbox.checked, _img_product_paths_iphone);
    
    new_iphone.AddToLocalStorage();

    inputs.forEach(input => { input.value = ''; });

    inputs[0].value = 'Apple'; 
    inputs[1].value = 'iPhone'; 

    while (drop_ul.firstChild)
      drop_ul.removeChild(drop_ul.firstChild);

    _img_product_paths_iphone = [];
  }
}

function AddMacbook()
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
    
    new_macbook.AddToLocalStorage();

    inputs.forEach(input => { input.value = ''; });

    inputs[0].value = 'Apple'; 
    inputs[1].value = 'Macbook'; 

    while (drop_ul2.firstChild)
      drop_ul2.removeChild(drop_ul2.firstChild);

    _img_product_paths_mackbook = [];
  }
}

function AddIpad()
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
    
    new_ipad.AddToLocalStorage();

    inputs.forEach(input => { input.value = ''; });

    inputs[0].value = 'Apple'; 
    inputs[1].value = 'Ipad';   

    while (drop_ul3.firstChild)
      drop_ul3.removeChild(drop_ul3.firstChild);

    _img_product_paths_ipad = [];
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
//#endregion