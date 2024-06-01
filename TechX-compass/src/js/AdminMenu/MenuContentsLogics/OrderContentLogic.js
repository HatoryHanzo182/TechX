import { ShowSuccessMessage, ShowErrorMessage } from "../AdminMenu.js";

/*========== Logic for loading product orders sector.==========*/
//#region [Loading review content.]
let number_orders = 0;
let orders = [];

function LoadAllOrders() 
{
    fetch('https://squid-app-d6fho.ondigitalocean.app:443/GetOrder', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => 
    {
        const formatted_data = data.formatted_data;

        if (formatted_data.length !== number_orders) 
        {
            number_orders = formatted_data.length;
            orders = formatted_data;

            FilterAndSortOrders();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function UpdateOrderTable(orders) 
{
    const order_body = document.getElementById('order-body');
    order_body.innerHTML = '';

    orders.reverse().forEach(order => 
    {
        const order_row = document.createElement('tr');

        order_row.classList.add('order-tr');

        const products = order.products.map(product => `
            <div class="product-info">
                <div>${product.category} ${product.brand} (${product.model}) ${product.color}</div>
            </div>
        `).join('');

        order_row.innerHTML = `
            <td class="order-td">${order._id}</td>
            <td class="order-td">${products}</td>
            <td class="order-td">${order.name}</td>
            <td class="order-td">${order.phone}</td>
            <td class="order-td">${order.email}</td>
            <td class="order-td">${order.city}</td>
            <td class="order-td">${order.delivery_adress}</td>
            <td class="order-td">${order.payment_method}</td>
            <td class="order-td">${order.sum}$</td>
            <td class="order-td">${order.date}</td>
            <td class="order-td">
                <select class="status-dropdown" data-order-id="${order._id}">
                    <option value="pending" ${order.status.toLowerCase() === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="confirmed" ${order.status.toLowerCase() === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="shipped" ${order.status.toLowerCase() === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="received" ${order.status.toLowerCase() === 'received' ? 'selected' : ''}>Received</option>
                    <option value="cancelled" ${order.status.toLowerCase() === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
        `;

        order_body.appendChild(order_row);
    });

    document.querySelectorAll('.status-dropdown').forEach(select => 
    {
        select.addEventListener('change', function() 
        {
            const order_id = this.dataset.orderId;
            const new_status = this.value;
            
            ChangeStatusOrder(order_id, new_status);
        });
    });
}
//#endregion

//#region [Search and Filter Functionality.]
const search_input = document.getElementById('search-order');
const sort_select = document.getElementById('sort-order');
const status_select = document.getElementById('filter-status-order');

search_input.addEventListener('input', FilterAndSortOrders);
sort_select.addEventListener('change', FilterAndSortOrders);
status_select.addEventListener('change', FilterAndSortOrders);

function FilterAndSortOrders() 
{
    const search_query = search_input.value.toLowerCase();
    const sort_order = sort_select.value;
    const status_filter = status_select.value;

    let filtered_orders = orders.filter(order =>
        order._id.toLowerCase().includes(search_query) ||
        order.name.toLowerCase().includes(search_query) ||
        order.phone.toLowerCase().includes(search_query) ||
        order.email.toLowerCase().includes(search_query) ||
        order.city.toLowerCase().includes(search_query) ||
        order.delivery_adress.toLowerCase().includes(search_query) ||
        order.date.toLowerCase().includes(search_query)
    );

    filtered_orders = filterOrders(filtered_orders, sort_order, status_filter);

    UpdateOrderTable(filtered_orders);
}

function filterOrders(orders, sort_order, status_filter) 
{
    let filtered_orders = orders.slice();

    if (sort_order === 'newest') 
        filtered_orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort_order === 'oldest') 
        filtered_orders.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (status_filter !== 'all')
        filtered_orders = filtered_orders.filter(order => order.status.toLowerCase() === status_filter);

    return filtered_orders;
}
//#endregion

//#region [Change status sector.]
function ChangeStatusOrder(order_id, new_status) 
{
    fetch('https://squid-app-d6fho.ondigitalocean.app:443/ChangeStatusOrder', 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({_id: order_id, status: new_status})
    })
    .then(response => response.json())
    .then(data => 
    {
        if (data.success) 
        {
            number_orders++;

            LoadAllOrders();
            ShowSuccessMessage(data.message);
        }
        else 
            ShowErrorMessage(data.message);
    })
    .catch(error => { console.error('Error:', error); });
}


//#endregion
let interval_id;

document.addEventListener("DOMContentLoaded", function() 
{
    LoadAllOrders();

    interval_id = setInterval(() => { LoadAllOrders(); }, 5000);
});