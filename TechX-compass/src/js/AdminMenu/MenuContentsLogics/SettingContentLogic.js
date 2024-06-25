//#region [Modal window settings.]
const _change_password_mw = document.getElementById(
  "id-modal-settings-content",
);

function ShowModalWindowChangePassword() {
  _change_password_mw.style.display = "flex";
}

function CloseModalWindowChangePassword() {
  _change_password_mw.style.display = "none";
}

const Confuse = async (str) => {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(str))
    .then((buffer) => {
      return Array.prototype.map
        .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
};

async function changePassword() {
  const _old_password = document.getElementById(
    "id-old-password-setting",
  ).value;
  const _new_password = document.getElementById(
    "id-new-password-setting",
  ).value;

  const currentPasswordHash = await window.electron.invoke(
    "GetPasswordHashFromLocalStorage",
  );

  if (!currentPasswordHash.success) {
    ShowErrorMessage(currentPasswordHash.message);
    return;
  }

  const oldPasswordHash = await Confuse(_old_password);

  if (currentPasswordHash.hash == oldPasswordHash) {
    const newPasswordHash = await Confuse(_new_password);

    const result = await window.electron.invoke(
      "UpdatePasswordHashFromLocalStorage",
      newPasswordHash,
    );

    if (!result.success) {
      ShowErrorMessage(result.message);
    } else {
      ShowSuccessMessage("Password changed successfully.");
      CloseModalWindowChangePassword();
      document.getElementById("id-old-password-setting").value = "";
      document.getElementById("id-new-password-setting").value = "";
    }
  } else {
    ShowErrorMessage("Old password is incorrect.");
  }
}

function ShowErrorMessage(message) {
  alert(message);
}

function ShowSuccessMessage(message) {
  alert(message);
}

document
  .getElementById("id-change-password")
  .addEventListener("click", ShowModalWindowChangePassword);
document
  .getElementById("id-cancel-change-password-setting")
  .addEventListener("click", CloseModalWindowChangePassword);
document
  .getElementById("id-change-password-setting")
  .addEventListener("click", changePassword);

//#endregion

//#region [Dark light theme.]
export const toggleTheme = () => {
  const body = document.body;
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";

  if (isDarkTheme) {
    body.classList.add("dark-theme");

    document.getElementById("theme-toggle").click();
  } else body.classList.remove("dark-theme");

  document
    .getElementById("theme-toggle")
    .addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("dark-theme");

        localStorage.setItem("darkTheme", "true");
      } else {
        body.classList.remove("dark-theme");
        localStorage.setItem("darkTheme", "false");
      }
    });
};
//#endregion

//#region [Localization.]
// INFO: Async load and return localization data from a JSON file
const loadLocalization = async (language) => {
  return fetch(`../locales/${language}.json`)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Failed to load ${language} localization: ${response.statusText}`,
        );

      return response.json();
    })
    .then((localization) => {
      return localization;
    })
    .catch((error) => {
      console.error("Error loading the localization file:", error);
    });
};

const changeLanguage = async (language) => {
  const localization = await loadLocalization(language);
  if (!localization) return;

  const setTextContent = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  };

  const setTextContentAll = (selector, text) => {
    const elements = document.querySelectorAll(selector);
    if (elements) {
      elements.forEach((element) => {
        element.textContent = text;
      });
    }
  };

  const setPlaceholder = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
      element.placeholder = text;
    }
  };

  const setPlaceholderAll = (selector, text) => {
    const elements = document.querySelectorAll(selector);
    if (elements) {
      elements.forEach((element) => {
        element.placeholder = text;
      });
    }
  };

  // Menu Items
  setTextContent(
    "#menu-product-management .text",
    localization["product_management"]["label"],
  );
  setTextContent("#menu-orders .text", localization["orders"]["label"]);
  setTextContent("#menu-activity .text", localization["activity"]["label"]);
  setTextContent(
    "#menu-user-reviews .text",
    localization["user_reviews"]["label"],
  );
  setTextContent("#menu-settings .text", localization["settings"]["label"]);
  setTextContent("#menu-exit .text", localization["exit"]["label"]);

  // Product Content
  setTextContent(
    "#id-create-product h2",
    localization["product_management"]["create_new_product"],
  );
  setTextContent(
    "#id-create-product p",
    localization["product_management"]["create_new_product_desc"],
  );
  const productsCards = document.querySelectorAll(".products-card");
  if (productsCards.length > 1) {
    setTextContent(
      ".products-card:nth-child(2) h2",
      localization["product_management"]["edit_product"],
    );
    setTextContent(
      ".products-card:nth-child(2) p",
      localization["product_management"]["edit_product_desc"],
    );
    setTextContent(
      ".products-card:nth-child(3) h2",
      localization["product_management"]["manage_products"],
    );
    setTextContent(
      ".products-card:nth-child(3) p",
      localization["product_management"]["manage_products_desc"],
    );
  }

  // Product Management

  // INFO: Back to Product Management BTN
  setTextContentAll(
    ".arrow-back-circle-outline-text",
    localization["product_data"]["back_menu"],
  );

  // INFO: Drag and drop area
  setTextContent(
    "#id-custum-file-upload-iphone .text",
    localization["product_data"]["upload_image"],
  );
  setTextContent(
    "#id-custum-file-upload-mackbook .text",
    localization["product_data"]["upload_image"],
  );
  setTextContent(
    "#id-custum-file-upload-ipad .text",
    localization["product_data"]["upload_image"],
  );
  setTextContent(
    "#id-custum-file-upload-airpods .text",
    localization["product_data"]["upload_image"],
  );
  setTextContent(
    "#id-custum-file-upload-watch .text",
    localization["product_data"]["upload_image"],
  );
  setTextContent(
    "#id-custum-file-upload-console .text",
    localization["product_data"]["upload_image"],
  );
  setTextContent(
    "#id-custum-file-upload-change-data .text",
    localization["product_data"]["upload_image"],
  );

  // INFO: Product Data Basic
  setTextContentAll(
    ".card-content-product-data-container label[for='characteristics']",
    localization["product_data"]["characteristics"],
  );

  // INFO: Product Data Characteristics
  setTextContentAll(
    ".card-content-product-data-container label[for='basic']",
    localization["product_data"]["basic_data"],
  );

  // INFO: Product Data Camera
  setTextContentAll(
    ".card-content-product-data-container label[for='camera']",
    localization["product_data"]["camera"],
  );

  // INFO: Product Data Color
  setTextContentAll(
    ".card-content-product-data-container label[for='color']",
    localization["product_data"]["color"],
  );

  // INFO: Product Data For Store
  setTextContentAll(
    ".card-content-product-data-container label[for='for-store']",
    localization["product_data"]["for_store"],
  );

  setTextContentAll(
    "#id-techx-store-data",
    localization["product_data"]["data_for_techx_store"],
  );

  // INFO: Product Data Add in carousels
  setTextContentAll(
    ".check-sector p",
    localization["product_data"]["add_in_carousel"],
  );

  // INFO: Placeholder region

  // Brand
  setPlaceholderAll(
    "#id-brand",
    localization["product_data"]["brand_placeholder"],
  );

  // Model
  setPlaceholderAll(
    "#id-model",
    localization["product_data"]["model_placeholder"],
  );

  // Processor
  setPlaceholderAll(
    "#id-processor",
    localization["product_data"]["processor_placeholder"],
  );

  // Memory
  setPlaceholderAll(
    "#id-memory",
    localization["product_data"]["memory_placeholder"],
  );

  // Display Size
  setPlaceholderAll(
    "#id-display-size",
    localization["product_data"]["display_size_placeholder"],
  );

  // Battery
  setPlaceholderAll(
    "#id-battery",
    localization["product_data"]["battery_placeholder"],
  );

  // Front Camera
  setPlaceholderAll(
    "#id-front-camera",
    localization["product_data"]["main_camera_placeholder"],
  );

  // Color
  setPlaceholderAll(
    "#id-color",
    localization["product_data"]["color_placeholder"],
  );

  // Price
  setPlaceholderAll(
    "#id-price",
    localization["product_data"]["price_placeholder"],
  );

  // Discount
  setPlaceholderAll(
    "#id-discount",
    localization["product_data"]["discount_placeholder"],
  );

  // Description
  setPlaceholderAll(
    "#id-description",
    localization["product_data"]["description_placeholder"],
  );

  // Title Card Content Product Data
  setTextContent(
    "#id-content-phone-data .title-card-content-product-data",
    localization["product_data"]["add_iphone"],
  );
  setTextContent(
    "#id-content-mackbook-data .title-card-content-product-data",
    localization["product_data"]["add_macbook"],
  );
  setTextContent(
    "#id-content-ipad-data .title-card-content-product-data",
    localization["product_data"]["add_ipad"],
  );
  setTextContent(
    "#id-content-airpods-data .title-card-content-product-data",
    localization["product_data"]["add_airpods"],
  );
  setTextContent(
    "#id-content-watch-data .title-card-content-product-data",
    localization["product_data"]["add_apple_watch"],
  );
  setTextContent(
    "#id-content-console-data .title-card-content-product-data",
    localization["product_data"]["add_console"],
  );

  // Description Card Content Product Data

  // Basic Data
  setTextContent(
    ".card-content-product-data-container #basic-iphone-data",
    localization["product_data"]["basic_iphone_data"],
  );

  setTextContent(
    ".card-content-product-data-container #basic-macbook-data",
    localization["product_data"]["basic_macbook_data"],
  );

  setTextContent(
    ".card-content-product-data-container #basic-ipad-data",
    localization["product_data"]["basic_ipad_data"],
  );

  setTextContent(
    ".card-content-product-data-container #basic-airpods-data",
    localization["product_data"]["basic_airpods_data"],
  );

  setTextContent(
    ".card-content-product-data-container #basic-watch-data",
    localization["product_data"]["basic_apple_watch_data"],
  );

  setTextContent(
    ".card-content-product-data-container #basic-console-data",
    localization["product_data"]["basic_console_data"],
  );

  // Characteristics
  setTextContent(
    ".card-content-product-data-container #id-internal-characteristics-iphone",
    localization["product_data"]["internal_characteristics_iphone"],
  );

  setTextContent(
    ".card-content-product-data-container #id-internal-characteristics-macbook",
    localization["product_data"]["internal_characteristics_macbook"],
  );

  setTextContent(
    ".card-content-product-data-container #id-internal-characteristics-ipad",
    localization["product_data"]["internal_characteristics_ipad"],
  );

  setTextContent(
    ".card-content-product-data-container #id-internal-characteristics-airpods",
    localization["product_data"]["internal_characteristics_airpods"],
  );

  setTextContent(
    ".card-content-product-data-container #id-internal-characteristics-watch",
    localization["product_data"]["internal_characteristics_apple_watch"],
  );

  setTextContent(
    ".card-content-product-data-container #id-internal-characteristics-console",
    localization["product_data"]["internal_characteristics_console"],
  );

  // Camera
  setTextContent(
    "#id-pixel-camera-iphone",
    localization["product_data"]["pixels_camera_iphone"],
  );

  setTextContent(
    "#id-pixel-camera-macbook",
    localization["product_data"]["pixels_camera_macbook"],
  );

  setTextContent(
    "#id-pixel-camera-ipad",
    localization["product_data"]["pixels_camera_ipad"],
  );

  // Color
  setTextContent(
    "#id-color-iphone",
    localization["product_data"]["color_iphone"],
  );

  setTextContent(
    "#id-color-macbook",
    localization["product_data"]["color_macbook"],
  );

  setTextContent("#id-color-ipad", localization["product_data"]["color_ipad"]);

  setTextContent(
    "#id-color-airpods",
    localization["product_data"]["color_airpods"],
  );

  setTextContent(
    "#id-color-watch",
    localization["product_data"]["color_apple_watch"],
  );

  setTextContent(
    "#id-color-console",
    localization["product_data"]["color_console"],
  );

  // Button Add Product
  setTextContent(
    "#id-button-add-iphone",
    localization["product_data"]["add_iphone"],
  );

  setTextContent(
    "#id-button-add-macbook",
    localization["product_data"]["add_macbook"],
  );

  setTextContent(
    "#id-button-add-ipad",
    localization["product_data"]["add_ipad"],
  );

  setTextContent(
    "#id-button-add-airpods",
    localization["product_data"]["add_airpods"],
  );

  setTextContent(
    "#id-button-add-watch",
    localization["product_data"]["add_apple_watch"],
  );

  setTextContent(
    "#id-button-add-console",
    localization["product_data"]["add_console"],
  );

  // Edit Product region

  setPlaceholder(
    ".search-by-model-or-brand",
    localization["orders"]["search_placeholder"],
  );

  setTextContent(
    "#status-filter option[value='']",
    localization["status_filter"]["all_status"],
  );

  setTextContent(
    "#status-filter option[value='active']",
    localization["status_filter"]["active"],
  );

  setTextContent(
    "#status-filter option[value='no active']",
    localization["status_filter"]["no_active"],
  );

  // Table Headers

  const tableHeaders = localization["product_table"];
  const tableHeadersCells = document.querySelectorAll(
    "#product-table thead tr th",
  );

  tableHeadersCells[0].textContent = tableHeaders["image"];
  tableHeadersCells[1].textContent = tableHeaders["category"];
  tableHeadersCells[2].textContent = tableHeaders["brand"];
  tableHeadersCells[3].textContent = tableHeaders["model"];
  tableHeadersCells[4].textContent = tableHeaders["price"];
  tableHeadersCells[5].textContent = tableHeaders["discount"];
  tableHeadersCells[6].textContent = tableHeaders["status"];
  tableHeadersCells[7].textContent = tableHeaders["change"];
  tableHeadersCells[8].textContent = tableHeaders["delete"];

  // Table Buttons
  setTextContent(".pagination #prev", localization["product_table"]["prev"]);
  setTextContent(".pagination #next", localization["product_table"]["next"]);

  // Update Data
  setTextContent(
    ".line-card-content-product-data-change .title-card-content-product-data",
    localization["product_table"]["update_data"],
  );

  setTextContent(
    "#id-button-change-product-data",
    localization["product_table"]["change_data"],
  );

  // Orders Content
  document.querySelector("#search-order").placeholder =
    localization["orders"]["search_placeholder"];
  setTextContent(
    "#sort-order option[value='oldest']",
    localization["orders"]["sort_options"]["newest_first"],
  );
  setTextContent(
    "#sort-order option[value='newest']",
    localization["orders"]["sort_options"]["oldest_first"],
  );

  const filterStatusOrder = localization["orders"]["filter_status_options"];
  const filterStatusOrderOptions = document.querySelectorAll(
    "#filter-status-order option",
  );

  filterStatusOrderOptions[0].textContent = filterStatusOrder["all"];
  filterStatusOrderOptions[1].textContent = filterStatusOrder["pending"];
  filterStatusOrderOptions[2].textContent = filterStatusOrder["confirmed"];
  filterStatusOrderOptions[3].textContent = filterStatusOrder["shipped"];
  filterStatusOrderOptions[4].textContent = filterStatusOrder["received"];
  filterStatusOrderOptions[5].textContent = filterStatusOrder["cancelled"];

  const orderTableHeaders = localization["orders"]["table_headers"];
  const orderTableHeaderCells = document.querySelectorAll(
    "#id-order-table table thead tr th",
  );

  orderTableHeaderCells[0].textContent = orderTableHeaders["order_id"];
  orderTableHeaderCells[1].textContent = orderTableHeaders["products"];
  orderTableHeaderCells[2].textContent = orderTableHeaders["name"];
  orderTableHeaderCells[3].textContent = orderTableHeaders["phone"];
  orderTableHeaderCells[4].textContent = orderTableHeaders["email"];
  orderTableHeaderCells[5].textContent = orderTableHeaders["city"];
  orderTableHeaderCells[6].textContent = orderTableHeaders["address"];
  orderTableHeaderCells[7].textContent = orderTableHeaders["payment"];
  orderTableHeaderCells[8].textContent = orderTableHeaders["sum"];
  orderTableHeaderCells[9].textContent = orderTableHeaders["date"];
  orderTableHeaderCells[10].textContent = orderTableHeaders["status"];

  // No Items Message

  setTextContent(
    ".title-nosearch-reviews",
    localization["orders"]["no_items_message"]["title"],
  );

  setTextContent(
    ".message-nosearch-reviews",
    localization["orders"]["no_items_message"]["message"],
  );

  // Activity Content
  setTextContent(
    "#id-activity-content .h1-activity",
    localization["activity"]["analytics"],
  );

  // Reviews Content
  setTextContent(
    "#id-card-missing-reviews .title-missing-reviews",
    localization["user_reviews"]["no_reviews_message"]["title"],
  );
  setTextContent(
    "#id-card-missing-reviews .message-missing-reviews",
    localization["user_reviews"]["no_reviews_message"]["message"],
  );
  setTextContent(
    "#id-card-nosearch-reviews .title-nosearch-reviews",
    localization["user_reviews"]["no_search_results_message"]["title"],
  );
  setTextContent(
    "#id-card-nosearch-reviews .message-nosearch-reviews",
    localization["user_reviews"]["no_search_results_message"]["message"],
  );
  setTextContent(
    "#id-delete-review-content .delete-review-confirmation-card h2",
    localization["user_reviews"]["delete_review"]["confirmation_title"],
  );
  setTextContent(
    "#id-delete-review-content .delete-review-confirmation-card p",
    localization["user_reviews"]["delete_review"]["confirmation_message"],
  );
  setTextContent(
    "#id-cancel-delete-review",
    localization["user_reviews"]["delete_review"]["cancel_button"],
  );
  setTextContent(
    "#id-delete-review",
    localization["user_reviews"]["delete_review"]["delete_button"],
  );

  // Settings Content
  setTextContent("#id-settings-content h1", localization["settings"]["label"]);
  setTextContent(
    '#id-settings-content label[for="language-select"]',
    localization["settings"]["language_select_label"],
  );
  setTextContent(
    '#id-settings-content label[for="theme-toggle"]',
    localization["settings"]["theme_button"],
  );
  setTextContent(
    '#id-settings-content label[for="change-password"]',
    localization["settings"]["change_password"]["button"],
  );
  setTextContent(
    "#id-change-password",
    localization["settings"]["change_password"]["button"],
  );
  setTextContent(
    "#id-modal-settings-content .confirmation-card h2",
    localization["settings"]["change_password"]["modal_title"],
  );
  setTextContent(
    '#id-modal-settings-content label[for="old-password"]',
    localization["settings"]["change_password"]["old_password_label"],
  );
  setTextContent(
    '#id-modal-settings-content label[for="new-password"]',
    localization["settings"]["change_password"]["new_password_label"],
  );
  setTextContent(
    "#id-cancel-change-password-setting",
    localization["settings"]["change_password"]["cancel_button"],
  );
  setTextContent(
    "#id-change-password-setting",
    localization["settings"]["change_password"]["change_button"],
  );

  // Exit Content
  setTextContent(
    "#id-exit-content .confirmation-card h2",
    localization["exit"]["confirmation_title"],
  );
  setTextContent(
    "#id-exit-content .confirmation-card p",
    localization["exit"]["confirmation_message"],
  );
  setTextContent("#id-cancel-exit", localization["exit"]["cancel_button"]);
  setTextContent("#id-exit-exit", localization["exit"]["exit_button"]);
};

// Add event listener for language selection
document
  .getElementById("language-select")
  .addEventListener("change", function () {
    changeLanguage(this.value);
  });
