import { ReturnToPreviousTab } from "../AdminMenu.js";

/*========== Logic for exiting the admin panel sector.==========*/
function ClickExitAccount() { electron.send("ShowAuthorization"); }
function ClickCancelAccount() 
{
    console.log("TRUE"); 
    ReturnToPreviousTab(); 
}

document.getElementById("id-exit-exit").addEventListener("click", ClickExitAccount);
document.getElementById("id-cancel-exit").addEventListener("click", ClickCancelAccount);
/*========================================*/