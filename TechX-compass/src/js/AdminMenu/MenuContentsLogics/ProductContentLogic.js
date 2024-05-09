import { products_content, DisableContent }  from "../AdminMenu.js";

//#region [Products tab navigation.]
const create_products_content = document.getElementById("id-create-product-content");
const create_products_content_phone = document.getElementById("id-content-phone-data");
const create_products_content_mackbook = document.getElementById("id-content-mackbook-data");

export function HideAllAddProductMenuItems()
{
    create_products_content.style.display = "none";
    create_products_content_mackbook.style.display = "none";
    create_products_content_phone.style.display = "none"
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

function BackToMainMenu()
{
  DisableContent();
  HideAllAddProductMenuItems();

  products_content.style.display = "flex";
}

document.getElementById("id-create-product").addEventListener("click", ShowContentProductCreation);
document.getElementById("id-create-product-content-phone").addEventListener("click", ShowContentProductIPhone);
document.getElementById("id-create-product-content-mackbook").addEventListener("click", ShowContentProductMackbook);
document.getElementById("id-back-to-product-menu").addEventListener("click", BackToMainMenu);
document.getElementById("id-back-to-product-menu2").addEventListener("click", BackToMainMenu);
//#endregion

//#region [Sector for adding new product.]
async function AddIPhone() 
{
  let img_path_genirated_server = [];

  for (const image_path of img_prosuct_putchs) 
  {
    try 
    {
      const response = await fetch(image_path);
      const file_blob = await response.blob();
      const file = new File([file_blob], image_path.split('/').pop());
      const form_data = new FormData();

      form_data.append('image', file);

      const upload_response = await fetch("http://localhost:3001/AddNewProductImg", 
      {
        method: 'POST',
        body: form_data,
      });

      if (!upload_response.ok)
        throw new Error('Failed to upload image');

      const data = await upload_response.json();

      img_path_genirated_server.push(data.file_names);
    } 
    catch (error) { console.error('Error uploading image:', error); }
  }

  const ResUserExists = await fetch("http://localhost:3001/AddIPhone",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
    { 
      category: "iPhone", 
      brand: "Apple", 
      model: "iPhone 3GS", 
      price: 200, 
      color: "black", 
      memory: "16GB", 
      displaySize: "3.5 (480x320), SD, TFT", 
      description: "OLD", 
      os: "IOS", 
      camera: "3 МP", 
      processor: "frequency: 600 MHz; number of cores: 1; video processor: PowerVR SGX535", 
      battery: "non-removable",
      images: img_path_genirated_server.flat(),
      incarousel: false
    })
  });

  if(ResUserExists.ok)
    console.log(ResUserExists.message);
}

document.getElementById("id-button-add-iphone").addEventListener("click", AddIPhone);
//#endregion

//#region [Dragandrop sector.]
const drop_area = document.getElementById('drop-area')
const custum_file_upload = document.getElementById('id-custum-file-upload')
const drop_ul = document.getElementById('id-drop-ul')
let img_prosuct_putchs = [];

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

      img_prosuct_putchs.push(files[i].path);

      rm_icon.onclick = () => 
      { 
          div.removeChild(image_icon)
          div.removeChild(child)
          div.removeChild(rm_icon)
          drop_ul.removeChild(div)
          img_prosuct_putchs.splice(i, 1);
      }

      div.appendChild(image_icon)
      div.appendChild(child)
      div.appendChild(rm_icon)
      drop_ul.appendChild(div)
  }
});
//#endregion