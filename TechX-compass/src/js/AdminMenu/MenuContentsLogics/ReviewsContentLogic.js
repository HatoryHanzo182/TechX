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
        CollectReviewCard(review_data)
    });
}

function CollectReviewCard(review_data)
{
    const container = document.getElementById("id-reviews-content");

    container.innerHTML = '';
    
    const reviewCards = review_data.reverse().map(review => 
    {
      const card = document.createElement("div");
      
      card.classList.add("group");
      card.innerHTML = `
        <div class="card-box">
            <div id="Hegel" class="card-review">
                <div class="content-review">
                    <p id="id-review-text" class="some">${review.review}</p>
                </div>
                <div class="thumb-review">
                    <img id="id-img-review" src="http://localhost:3001/GetImage/${review.product_arr.images[0]}" height="250px" width="250px" alt="img-review">
                </div>
                <div class="detial-review">
                    <div class="title-review">
                        <p id="id-name-review" class="name-review">${review.product_arr.model}</p>
                    </div>
                    <div class="level-review">

                    </div>        
                    <div class="infomation-review">
                        <p class="propertion-review">2024.1.11</p>
                        <p class="propertion-review">${review.owner_name}</p>
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>`;

        const levelReview = card.querySelector(".level-review");
        
        levelReview.innerHTML = '';

        for (let i = 0; i < 5; i++) 
        {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            svg.setAttribute("viewBox", "0 0 16 16");
            svg.setAttribute("class", "bi bi-star");
            svg.setAttribute("fill", "currentColor");
            svg.setAttribute("height", "16");
            svg.setAttribute("width", "16");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            if (i < review.grade)
                path.setAttribute("d", "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z");
            else
                path.setAttribute("d", "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z");
            
                svg.appendChild(path);
            levelReview.appendChild(svg);
        }
        return card;
    });
    
    container.append(...reviewCards);
}

window.onload = function() 
{
    LoadAllReviews();
    setInterval(LoadAllReviews, 10000);
};
/*========================================*/