//#region [Loading sector statistics.]
let product_сhart;
let _product_statistics_labels = [];
let _product_statistics_data_view = [];
let _product_statistics_sales = [];
let _product_statistics_favorites = [];

async function LoadAllStatistics()
{
  try 
  {
    const response = await fetch('http://localhost:3000/api/activity/GetProductStatistics', 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });

    if (!response.ok)
        throw new Error('Network response was not ok ' + response.statusText);

    const data = await response.json();
    
    _product_statistics_labels = data.map(item => item.model);
    _product_statistics_data_view = data.map(item => item.number_views);
    _product_statistics_sales = data.map(item => item.number_sales);
    _product_statistics_favorites = data.map(item => item.number_favorites);

    UpdateChart();
  } 
  catch (error) { console.error('There was a problem with the fetch operation:', error); }
}

function UpdateChart()
{
  if (product_сhart)
    product_сhart.destroy();

  const data_product_for_analitic = 
  {
    labels: _product_statistics_labels,
    datasets: 
    [
      {
        label: 'Viewed',
        data: _product_statistics_data_view,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Ordered',
        data: _product_statistics_sales,
        backgroundColor: 'rgba(98, 107, 171, 0.2)',
        borderColor: 'rgba(98, 107, 171, 1)',
        borderWidth: 1
      },
      {
        label: 'In users favorites',
        data: _product_statistics_favorites,
        backgroundColor: 'rgba(242, 142, 70, 0.2)',
        borderColor: 'rgba(242, 142, 70, 1)',
        borderWidth: 1
      }
    ]
  };

  const config_product_analitic = 
  {
    type: 'bar',
    data: data_product_for_analitic,
    options: 
    {
      animation: false,
      scales: 
      {
        y: 
        {
          beginAtZero: true
        }
      }
    },
  };

  const ctx = document.getElementById('id-product-chart').getContext('2d');

  product_сhart = new Chart(ctx, config_product_analitic);
};
//#endregion 
  
let interval_id;

document.addEventListener("DOMContentLoaded", function() 
{
  LoadAllStatistics();

  interval_id = setInterval(() => { LoadAllStatistics(); }, 5000);
});