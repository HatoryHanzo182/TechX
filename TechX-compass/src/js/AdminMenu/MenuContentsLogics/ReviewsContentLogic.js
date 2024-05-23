import { ShowSuccessMessage, ShowErrorMessage } from "../AdminMenu.js";

/*========== Logic for loading product reviews sector.==========*/
//#region [Loading review content.]
let number_reviews = 0;

function LoadAllReviews() 
{
    fetch('https://squid-app-d6fho.ondigitalocean.app:443/GetProductReview', 
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
        if(review_data.length != number_reviews)
        {
            number_reviews = review_data.length

            CollectReviewCard(review_data)
            HiddenNoReviews();
        }
        else if(review_data.length == 0)
            ShowNoReviews();
    });
}

function CollectReviewCard(review_data)
{
    const container = document.getElementById("id-reviews-card");

    container.innerHTML = '';

    const review_cards = review_data.reverse().map(review => 
    {
      const card = document.createElement("div");
      const review_date = review.viewed_admin ? review.date : "NEW"; 

      card.classList.add("group");
      card.innerHTML = `
        <div class="card-box">
            <div id="Hegel" class="card-review">
                <div class="content-review">
                    <p id="id-review-text" class="some">${review.review}</p>
                </div>
                <div class="thumb-review">
                    <img id="id-img-review" src="https://squid-app-d6fho.ondigitalocean.app:443/GetImage/${review.product_arr.images[0]}" height="250px" width="250px" alt="img-review">
                </div>
                <div class="detial-review">
                    <div class="title-review">
                        <p id="id-name-review" class="name-review">${review.product_arr.model}</p>
                    </div>
                    <div class="level-review"></div>        
                    <div class="infomation-review"> 
                        <p class="propertion-review">${review_date}</p>
                        <p class="propertion-review">${review.owner_name}</p>
                        <ion-icon id="id-delete-review-${review.id}" name="trash-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>`;

        const level_review = card.querySelector(".level-review");
        
        level_review.innerHTML = '';

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

            level_review.appendChild(svg);
        }

        card.addEventListener("mouseover", () => 
        { 
            if(!review.viewed_admin)
                AdminСhecked(review.id); 
        });
        return card;
    });
    
    container.append(...review_cards);
}

function AdminСhecked(id)
{
    try 
    {
        fetch('https://squid-app-d6fho.ondigitalocean.app:443/AdminChecked', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(response => 
        {
            if (!response.ok)
                throw new Error('Network response was not ok');
        });
    } 
    catch (error) { console.error(error); }
}
//#endregion

//#region [Search review content.]
document.querySelector('.input').addEventListener('input', function() 
{
    const search_text = this.value.toLowerCase();
    const review_cards = document.querySelectorAll('.card-review');
    let found = false;

    review_cards.forEach(card => 
    {
        const review_text = card.querySelector('.some').textContent.toLowerCase();
        const product_name = card.querySelector('.name-review').textContent.toLowerCase();
        const owner_name = card.querySelector('.propertion-review:nth-child(2)').textContent.toLowerCase();
        const review_date = card.querySelector('.propertion-review:first-child').textContent.toLowerCase();

        if (review_text.includes(search_text) || product_name.includes(search_text) || owner_name.includes(search_text) || review_date.includes(search_text)) 
        {
            card.style.display = 'block';
            found = true;
            
            HiddenNoSearchReviews();
        }
        else
            card.style.display = 'none';
    });

    if (!found)
    {
        if(number_reviews === 0)
        {
            HiddenNoReviews();
            clearInterval(interval_id);
        }

        ShowNoSearchReviews();
    }
    
    if(search_text.length === 0)
    {
        HiddenNoSearchReviews();

        if(number_reviews === 0)
        {
            ShowNoReviews();
            interval_id = setInterval(() => { LoadAllReviews(); }, 5000);
        }
    }
});
//#endregion 

//#region [Window display window missing.]
function ShowNoReviews()
{
    const card_missing_reviews = document.getElementById("id-card-missing-reviews");

    card_missing_reviews.style.display = "flex";
}

function HiddenNoReviews()
{
    const card_missing_reviews = document.getElementById("id-card-missing-reviews");

    card_missing_reviews.style.display = "none";
}
//#endregion

//#region [Window display window no search result.]
function ShowNoSearchReviews()
{
    const card_nosearch_reviews = document.getElementById("id-card-nosearch-reviews");

    card_nosearch_reviews.style.display = "flex";
}

function HiddenNoSearchReviews()
{
    const card_nosearch_reviews = document.getElementById("id-card-nosearch-reviews");

    card_nosearch_reviews.style.display = "none";
}
//#endregion

//#region [Delete review content.]
const confirmation_window = document.getElementById("id-delete-review-content");
let _review_id;

function DeleteReviewFromDB(event)
{
    if (event.target && event.target.matches('[id^="id-delete-review-"]')) 
    {
        const review_id = event.target.id.replace('id-delete-review-', '');
        
        ShowReviewDeletionConfirmation(review_id);
    }
}

function ShowReviewDeletionConfirmation(review_id)
{
    clearInterval(interval_id);

    confirmation_window.style.display = "flex";
    _review_id = review_id
}

function CancelDeleteReview()
{
    confirmation_window.style.display = "none";

    interval_id = setInterval(() => { LoadAllReviews(); }, 5000);
}

function DeleteReview()
{
    CancelDeleteReview();

    fetch('https://squid-app-d6fho.ondigitalocean.app:443/RemovingReviewById', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: _review_id })
    }).then(response => 
    {
        if (!response.ok)
            throw new Error('Network response was not ok');
        return response.json();
    }).then(data => 
    {
        if(data.success)
            ShowSuccessMessage("Successful removal of manager");
        else
            ShowErrorMessage("Error, something happened on the server, try again later")

        LoadAllReviews();
    }).catch(error => 
    {
        console.error('Error:', error);
    });
}

document.addEventListener('click', DeleteReviewFromDB);
document.getElementById("id-cancel-delete-review").addEventListener("click", CancelDeleteReview);
document.getElementById("id-delete-review").addEventListener("click", DeleteReview);
// #endregion

let interval_id;

window.onload = function() 
{
    LoadAllReviews();

    interval_id = setInterval(() => { LoadAllReviews(); }, 5000);
};
/*========================================*/