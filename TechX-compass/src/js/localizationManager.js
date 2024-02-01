// INFO: Async load and return localization data from a JSON file
const loadLocalization = async(language) => {
  return fetch(`../locales/${language}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to load ${language} localization: ${response.statusText}`,
        );
      }
      return response.json();
    })
    .then((localization) => {
      return localization;
    })
    .catch((error) => {
      console.error("Error loading the localization file:", error);
    });
}

export const changeLanguage = async(language, list_item) => {
  const localization = await loadLocalization(language);

  // INFO: Menu Items
  list_item[0].querySelector(".text").textContent =
    localization["product_management"]["label"];
  list_item[1].querySelector(".text").textContent = localization["orders"];
  list_item[2].querySelector(".text").textContent = localization["activity"];
  list_item[3].querySelector(".text").textContent =
    localization["user_reviews"];
  list_item[4].querySelector(".text").textContent =
    localization["sales_accounting"];
  list_item[5].querySelector(".text").textContent = localization["settings"];
  list_item[6].querySelector(".text").textContent =
    localization["exit"]["label"];

  // INFO: Product Content
  document.querySelector('#id-create-product h2').textContent = localization['product_management']['create_new_product'];
  document.querySelector('#id-create-product p').textContent = localization['product_management']['create_new_product_desc'];

  document.querySelectorAll('.products-card')[1].querySelector('h2').textContent = localization['product_management']['edit_product'];
  document.querySelectorAll('.products-card')[1].querySelector('p').textContent = localization['product_management']['edit_product_desc'];

  document.querySelectorAll('.products-card')[2].querySelector('h2').textContent = localization['product_management']['manage_products'];
  document.querySelectorAll('.products-card')[2].querySelector('p').textContent = localization['product_management']['manage_products_desc'];

  // INFO: Orders Content
  document.querySelector("#id-orders-content h1").textContent =
    localization["orders"];

  // INFO: Activity Content
  document.querySelector("#id-activity-content h1").textContent =
    localization["activity"];

  // INFO: Reviews Content
  document.querySelector("#id-reviews-content h1").textContent =
    localization["user_reviews"];

  // INFO: Accounting Content
  document.querySelector("#id-accounting-content h1").textContent =
    localization["sales_accounting"];

  // INFO: Settings Content
  document.querySelector("#id-settings-content h1").textContent =
    localization["settings"];
  document.querySelector(
    '#id-settings-content label[for="language-select"]',
  ).textContent = localization["language_select_label"];

  // INFO: Exit Content
  document.querySelector("#id-exit-content .confirmation-card h2").textContent =
    localization["exit"]["confirmation_title"];
  document.querySelector("#id-exit-content .confirmation-card p").textContent =
    localization["exit"]["confirmation_message"];
  document.querySelector("#id-cancel-exit").textContent =
    localization["exit"]["cancel_button"];
  document.querySelector("#id-exit-exit").textContent =
    localization["exit"]["exit_button"];
}