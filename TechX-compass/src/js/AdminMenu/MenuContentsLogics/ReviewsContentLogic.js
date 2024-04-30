/*========== Logic for loading product reviews sector.==========*/
function LoadAllReviews() 
{
  fetch('http://localhost:3001/GetProductReview', 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => 
  {
    if (!response.ok)
      throw new Error('Network response was not ok');
    
    return response.json();
  }).then(review_data => 
  { 
    console.log(review_data);

    const review_img = document.getElementById("id-img-review");
    const review_text = document.getElementById("id-review-text");
    const review_name = document.getElementById("id-name-review");

    review_text.innerText = review_data[3].review;

    fetch(`http://localhost:3001/ExtractData/${review_data[0].product_id}`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => 
    {
      if (!response.ok)
        throw new Error('Network response was not ok');
      
      return response.json();
    }).then(review_product_data => 
    {
      console.log(review_product_data);

      review_img.src = `http://localhost:3001/GetImage/${review_product_data.images[0]}`;
      review_name.innerText = review_product_data.model;
    });
  }).catch(error => 
  {
    console.error('There was a problem with your fetch operation:', error);
  });
}

// window.onload = function() {
//     LoadAllReviews();
    
//     console.log("AAAAA");
//     setInterval(LoadAllReviews, 60000);
// };
LoadAllReviews();
/*========================================*/