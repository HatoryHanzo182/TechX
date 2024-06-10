/*==========Import Sector.==========*/
import { changeLanguage } from "./localizationManager.js";
import { toggleTheme } from "./dark-mode-switcher.js";
import { HideAllAddProductMenuItems } from "./MenuContentsLogics/ProductContentLogic.js";
/*========================================*/

/*==========Global Variables Sector.==========*/
/*** Menu elements ***/
const menu_toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const list_item = document.querySelectorAll(".list-item");

/*** Content menu elements ***/
export const products_content = document.getElementById("id-products-content");

const orders_content = document.getElementById("id-orders-content");
const activity_content = document.getElementById("id-activity-content");
const reviews_content = document.getElementById("id-reviews-content");
const accounting_content = document.getElementById("id-accounting-content");
const settings_content = document.getElementById("id-settings-content");
const exit_content = document.getElementById("id-exit-content");
let user_position_index_menu = 0;

/*** Content products elements ***/

/*========================================*/


/*==========Initialization Sector.==========*/
toggleTheme();
/*========================================*/


/*==========Logic of the vertical menu sector.==========*/
menu_toggle.addEventListener("click", () => { navigation.classList.toggle("open"); });

list_item.forEach((item) => item.classList.remove("active"));

list_item[0].classList.add("active");
products_content.style.display = "flex";

list_item.forEach((item) => 
{
  item.addEventListener("click", () => 
  {
    list_item.forEach((item) => item.classList.remove("active"));

    item.classList.add("active");
  });
});
/*========================================*/


/*==========Content display logic sector.==========*/
export function DisableContent() 
{
  products_content.style.display = "none";
  orders_content.style.display = "none";
  activity_content.style.display = "none";
  reviews_content.style.display = "none";
  accounting_content.style.display = "none";
  settings_content.style.display = "none";
  exit_content.style.display = "none";
}

function RecordWhereUserIsNow(menu_item_index) { user_position_index_menu = menu_item_index; }

list_item[0].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(0);
  
  products_content.style.display = "flex";
});

list_item[1].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(1);

  orders_content.style.display = "flex";
});

list_item[2].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems()
  RecordWhereUserIsNow(2);

  activity_content.style.display = "flex";
});

list_item[3].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(3);

  reviews_content.style.display = "flex";
});

list_item[4].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(4);

  accounting_content.style.display = "flex";
});

list_item[5].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(5);

  settings_content.style.display = "flex";
});

list_item[6].addEventListener("click", () => 
{
  DisableContent();
  HideAllAddProductMenuItems();

  exit_content.style.display = "flex";
});
/*========================================*/

/*========== Logic for exiting the admin panel sector.==========*/
export function ReturnToPreviousTab() 
{
  exit_content.style.display = "none";

  if (user_position_index_menu === 0) 
    products_content.style.display = "flex";
  else if (user_position_index_menu === 1)
    orders_content.style.display = "flex";
  else if (user_position_index_menu === 2)
    activity_content.style.display = "flex";
  else if (user_position_index_menu === 3)
    reviews_content.style.display = "flex";
  else if (user_position_index_menu === 4)
    accounting_content.style.display = "flex";
  else if (user_position_index_menu === 5)
    settings_content.style.display = "flex";

  list_item[6].classList.remove("active");
  list_item[user_position_index_menu].classList.add("active");
}

document.getElementById("language-select").addEventListener("change", function () { changeLanguage(this.value, list_item); });
/*========================================*/

//#region [Message display logic.]
export function ShowSuccessMessage(mess)  // <-- Displaying the Success window.
{
    const success_message = document.getElementById("id-notification");
    const message = document.getElementById("id-message-success");

    message.innerText = mess;
    success_message.style.display = "flex";

    setTimeout(() => {  success_message.style.display = "none"; }, 4000);
}

export function ShowErrorMessage(mess)  // <-- Displaying the Error window.
{
    const error_message = document.getElementById("id-error-review");
    const message = document.getElementById("id-error-review-message");

    message.innerText = mess;
    error_message.style.display = "flex";

    setTimeout(() => {  error_message.style.display = "none"; }, 4000);
}

function BreakSuccessMessage()  // <-- Break displaying the success window.
{
    const success_message = document.getElementById("id-notification");
    
    success_message.style.display = "none";
}

function BreakErrorMessage()  // <-- Break displaying the error window.
{
    const error_message = document.getElementById("id-error-review");
    
    error_message.style.display = "none";
}

document.getElementById("id-close-success-message").onclick = BreakSuccessMessage;
document.getElementById("id-close-error-message").onclick = BreakErrorMessage;
//#endregion 

window.electron.receive('ShowReview', () => 
{
  list_item.forEach((item) => item.classList.remove("active"));
  list_item[3].classList.add("active");

  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(3);

  reviews_content.style.display = "flex";
});

window.electron.receive('ShowOrder', () => 
{
  list_item.forEach((item) => item.classList.remove("active"));
  list_item[1].classList.add("active");

  DisableContent();
  HideAllAddProductMenuItems();
  RecordWhereUserIsNow(3);

  orders_content.style.display = "flex";
});