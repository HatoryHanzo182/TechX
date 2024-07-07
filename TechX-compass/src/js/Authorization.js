/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  * AUTHORIZATION WINDOW LOGIC.💊
*/

// <==-- Accessibility check sector. --==>
function Confuse(str)  // <-- This function takes a string and returns the SHA-256 
{                     // hash of that string for the password verification function.
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(buffer =>
    {
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    });
}

function Validator()  // <-- Password check function.
{
    const _admin_password = document.getElementById("id-admin-password").value;

    if(_admin_password.trim() === "")
    {
        ShowErrorMessage("Empty password string");
        return;
    }

    Confuse(_admin_password).then(hashed_pass =>
    {            
        if(hashed_pass === 'c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f')
            electron.send('ShowAdminPanel'); 
        else
            ShowErrorMessage("Incorrect password");
    });
}
// <==-- --==>


// <==-- Error message display area. --==>
function ShowErrorMessage(mess)  // <-- Displaying the error window.
{
    const error_message = document.getElementById("id-error-message");
    const message = document.getElementById("id-message");

    message.innerText = mess;
    error_message.style.display = "flex";

    setTimeout(() => { error_message.style.display = "none"; }, 4000);
}

function BreakErrorMessage()
{
    const error_message = document.getElementById("id-error-message");
    
    error_message.style.display = "none";
}
// <==-- --==>


// <==-- Event Handler Sector. --==>
document.getElementById("id-button-confirm").onclick = Validator;
document.getElementById("id-close-error-message").onclick = BreakErrorMessage;
// <==-- --==>