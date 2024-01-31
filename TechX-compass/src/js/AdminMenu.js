const menu_toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
const list_item = document.querySelectorAll('.list-item');
const products_content = document.getElementById('id-products-content');
const orders_content = document.getElementById('id-orders-content');
const activity_content = document.getElementById('id-activity-content');
const reviews_content = document.getElementById('id-reviews-content');
const accounting_content = document.getElementById('id-accounting-content');
const settings_content = document.getElementById('id-settings-content');
const exit_content = document.getElementById('id-exit-content');
let user_on_content_item = 0;


/*==========Logic of the vertical menu sector.==========*/
menu_toggle.addEventListener('click', () => { navigation.classList.toggle('open'); })

list_item.forEach(item => item.classList.remove('active'));

list_item[0].classList.add('active');
products_content.style.display = 'flex';

list_item.forEach(item =>
{
    item.addEventListener('click', ()=>
    {
        list_item.forEach(item => item.classList.remove('active'));
        
        item.classList.add('active');
    })
})
/*========================================*/


/*==========Content display logic sector.==========*/
function DisableContent()
{
    products_content.style.display = 'none';
    orders_content.style.display = 'none';
    activity_content.style.display = 'none';
    reviews_content.style.display = 'none';
    accounting_content.style.display = 'none';
    settings_content.style.display = 'none';
    exit_content.style.display = 'none';
}

function RecordWhereUserIsNow(menu_item_index) { user_on_content_item = menu_item_index; }

list_item[0].addEventListener('click', () => 
{
    DisableContent();
    RecordWhereUserIsNow(0);
    products_content.style.display = 'flex';
});

list_item[1].addEventListener('click', () => 
{
    DisableContent();
    RecordWhereUserIsNow(1);
    orders_content.style.display = 'flex';
});

list_item[2].addEventListener('click', () => 
{
    DisableContent();
    RecordWhereUserIsNow(2);
    activity_content.style.display = 'flex';
});

list_item[3].addEventListener('click', () => 
{
    DisableContent();
    RecordWhereUserIsNow(3);
    reviews_content.style.display = 'flex';
});

list_item[4].addEventListener('click', () => 
{
    DisableContent();
    RecordWhereUserIsNow(4);
    accounting_content.style.display = 'flex';
});

list_item[5].addEventListener('click', () => 
{
    DisableContent();
    RecordWhereUserIsNow(5);
    settings_content.style.display = 'flex';
});

list_item[6].addEventListener('click', () => 
{
    DisableContent();
    exit_content.style.display = 'flex';
});


/*========== Logic for exiting the admin panel sector.==========*/
function ClickExitAccount() { electron.send('ShowAuthorization'); }

function ClickCancelAccount()
{
    exit_content.style.display = 'none';

    if(user_on_content_item === 0)
        products_content.style.display = 'flex';
    else if(user_on_content_item === 1)
        orders_content.style.display = 'flex';
    else if(user_on_content_item === 2)
        activity_content.style.display = 'flex';
    else if(user_on_content_item === 3)
        reviews_content.style.display = 'flex';
    else if(user_on_content_item === 4)
        accounting_content.style.display = 'flex';
    else if(user_on_content_item === 5)
        settings_content.style.display = 'flex';
    
    list_item[6].classList.remove('active');
    list_item[user_on_content_item].classList.add('active');
}

document.getElementById('id-exit-exit').addEventListener('click', ClickExitAccount)
document.getElementById('id-cancel-exit').addEventListener('click', ClickCancelAccount)
/*========================================*/