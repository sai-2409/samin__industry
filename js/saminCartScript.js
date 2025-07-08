// Tryna config delete button for the cartSamin page
const deleteButton = document.querySelectorAll(".remove__item");
const showCardBtn = document.getElementById("show__card-info");
const cardInformation = document.querySelector(".card-form-container");
const addressFillForm = document.querySelector(".checkout__block-link-address");
const addressForm = document.querySelector(".common__container-address-form");
const checkoutFormButton = document.querySelector(".order__button");

// Writing function for the toggling forms
const toggleForm = (formName, infoForm) => {
  if (formName && infoForm) {
    formName.addEventListener("click", function () {
      infoForm.classList.toggle("section__hidden");
    });
  }
};

// Moving to Order Checkout
if (checkoutFormButton) {
  checkoutFormButton.addEventListener("click", function () {
    const header = document.querySelector(".checkout__header-h1");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Moving back to the home page
const homePageBack = document.querySelector(".home__page-back");
if (homePageBack) {
  homePageBack.addEventListener("click", function () {
    window.location.href = "index.html";
  });
}

// deleteButton.forEach(button => {
//   button.addEventListener('click', function() {
//     const card = button.closest('.wall__card');
//     if (card) card.remove();
//   });
// });

// Showing card informaion in saminCart
if (showCardBtn && cardInformation) {
  toggleForm(showCardBtn, cardInformation);
}
// Showing address fillout form
if (addressFillForm && addressForm) {
  toggleForm(addressFillForm, addressForm);
}

// Bro, you know the filling when it seems that everything is going amazing, and you have a lot of stuff to do, at the same moment you wanna
// chill and enjoy your life. I can not chill, not now !
// Trying to save address when user clicks on save address button

const form = document.querySelector(".address-form__form");
const savedAddressList = document.getElementById("savedAddressList");
let addressCount = 1;

// Load saved addresses from localStorage on page load
let savedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
let selectedAddressId = localStorage.getItem("selectedAddressId") || null;

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName")?.value || "";
    const street = document.getElementById("streetAddress")?.value || "";
    const city = document.getElementById("city")?.value || "";
    const building = document.getElementById("building")?.value || "";
    const flat = document.getElementById("flat")?.value || "";
    const zipCode = document.getElementById("zipCode")?.value || "";
    const phone = document.getElementById("phone")?.value || "";

    // Create address object
    const addressData = {
      id: Date.now(), // Unique ID for each address
      fullName,
      street,
      city,
      building,
      flat,
      zipCode,
      phone,
      number: addressCount,
    };

    // Add to savedAddresses array
    savedAddresses.push(addressData);

    // Save to localStorage
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));

    if (savedAddressList) {
      const cardHTML = `
        <div class="saved-address__card" width="100%" data-address-id="${
          addressData.id
        }">
        <div class="saved-address__number">${addressCount}</div>
        <div class="saved-address__info">
            <div class="saved-address__name-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div class="saved-address__name" style="font-weight: bold; font-size: 1.08em;">Имя: ${fullName}</div>
              ${
                phone
                  ? `<span class="saved-address__phone" style="color: #888; font-size: 0.98em; margin-left: 16px;">Телефон: ${phone}</span>`
                  : ""
              }
            </div>
            <div class="saved-address__text" style="margin-bottom: 2px;"><span style="color:#888;">Адрес:</span> ${street}, д${building}, кв${flat}</div>
            <div class="saved-address__text" style="margin-bottom: 2px;"><span style="color:#888;">Город:</span> ${city}</div>
            <div class="saved-address__text"><span style="color:#888;">Индекс:</span> ${zipCode}</div>
        </div>
          <div class="saved-address__actions" style="margin-top: 8px;">
            <button class="saved-address__button saved__address-button-select common__button">Выбрать</button>
          <button class="saved-address__button saved__address-button-delete common__button">Удалить</button>
        </div>
      </div>
  `;
      savedAddressList.insertAdjacentHTML("beforeend", cardHTML);
      addressCount++;
      form.reset();

      // Setup event listeners for the new card
      setupSelectButtons();
      setupDeleteButtons();
    }
  });
}

// Helper to update payment section address/recipient
function updatePaymentAddressRecipient(addressObj) {
  const addressSpan = document.getElementById("payment-address-value");
  const recipientSpan = document.getElementById("payment-recipient-value");
  const phoneSpan = document.getElementById("payment-recipient-phone");
  if (addressObj) {
    // Compose address string
    let addressStr = "";
    if (addressObj.city) addressStr += addressObj.city + ", ";
    if (addressObj.street) addressStr += addressObj.street + ", ";
    if (addressObj.building) addressStr += "д" + addressObj.building + ", ";
    if (addressObj.flat) addressStr += "кв" + addressObj.flat + ", ";
    if (addressObj.zipCode) addressStr += addressObj.zipCode;
    addressStr = addressStr.replace(/, $/, "");
    addressSpan.textContent = addressStr || "—";
    recipientSpan.textContent = addressObj.fullName || "—";
    phoneSpan.textContent = addressObj.phone ? ", " + addressObj.phone : "";
  } else {
    addressSpan.textContent = "—";
    recipientSpan.textContent = "—";
    phoneSpan.textContent = "";
  }
}

// On page load, show the selected address in payment section if exists
function showSelectedAddressInPayment() {
  const selectedId = parseInt(localStorage.getItem("selectedAddressId"));
  if (!selectedId) {
    updatePaymentAddressRecipient(null);
    return;
  }
  const selectedAddress = savedAddresses.find((addr) => addr.id === selectedId);
  if (selectedAddress) {
    updatePaymentAddressRecipient(selectedAddress);
  } else {
    updatePaymentAddressRecipient(null);
  }
}

// Update: When user selects a different address, update payment section
function setupSelectButtons() {
  document.querySelectorAll(".saved__address-button-select").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".saved-address__card");
      const addressId = parseInt(card.dataset.addressId);

      // Remove 'selected' from all buttons
      document
        .querySelectorAll(".saved__address-button-select")
        .forEach((b) => {
          b.classList.remove("selected");
          b.textContent = "Выбрать";
        });
      // Add 'selected' to the clicked button
      this.classList.add("selected");
      this.textContent = "Выбран";

      // Save selected address ID to localStorage
      localStorage.setItem("selectedAddressId", addressId);

      // Update payment section with this address
      const selectedAddress = savedAddresses.find(
        (addr) => addr.id === addressId
      );
      if (selectedAddress) {
        updatePaymentAddressRecipient(selectedAddress);
      } else {
        updatePaymentAddressRecipient(null);
      }
    });
  });
}

// When deleting an address, if it was selected, clear payment section
function setupDeleteButtons() {
  document.querySelectorAll(".saved__address-button-delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".saved-address__card");
      if (card) {
        const addressId = parseInt(card.dataset.addressId);

        // Remove from savedAddresses array
        savedAddresses = savedAddresses.filter((addr) => addr.id !== addressId);

        // If the deleted address was selected, clear the selection
        if (parseInt(localStorage.getItem("selectedAddressId")) === addressId) {
          localStorage.removeItem("selectedAddressId");
          updatePaymentAddressRecipient(null);
        }

        // Update localStorage
        localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));

        // Animate and remove card
        card.classList.add("fade-out-slide");
        setTimeout(() => {
          card.remove();
          // Renumber all remaining cards after deletion
          renumberAddressCards();
        }, 500);
      }
    });
  });
}

// Function to renumber all address cards
function renumberAddressCards() {
  const cards = document.querySelectorAll(".saved-address__card");
  cards.forEach((card, index) => {
    const numberElement = card.querySelector(".saved-address__number");
    if (numberElement) {
      numberElement.textContent = index + 1;
    }
  });
  // Update the addressCount to match the new total
  addressCount = cards.length + 1;

  // Update savedAddresses array with new numbers
  savedAddresses.forEach((address, index) => {
    address.number = index + 1;
  });
  localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
}

// After loading saved addresses, restore selection
function loadSavedAddresses() {
  if (savedAddresses.length > 0) {
    savedAddresses.forEach((address) => {
      const isSelected =
        parseInt(localStorage.getItem("selectedAddressId")) === address.id;
      const cardHTML = `
        <div class="saved-address__card" width="100%" data-address-id="${
          address.id
        }">
          <div class="saved-address__number">${address.number}</div>
          <div class="saved-address__info">
            <div class="saved-address__name-row" style="display: flex; justify-content: space-between; align-items: center;">
              <div class="saved-address__name">${address.fullName}</div>
              ${
                address.phone
                  ? `<span class="saved-address__phone" style="color: #888; font-size: 0.98em; margin-left: 16px;">${address.phone}</span>`
                  : ""
              }
            </div>
            <div class="saved-address__text">${address.street}</div>
            <div class="saved-address__text">${address.city}, ${
        address.zipCode
      }</div>
            <div class="saved-address__text">д${address.building}, кв${
        address.flat
      }</div>
          </div>
          <div class="saved-address__actions">
            <button class="saved-address__button saved__address-button-select saved__address-button common__button ${
              isSelected ? "selected" : ""
            }">${isSelected ? "Выбран" : "Выбрать"}</button>
            <button class="saved-address__button saved__address-button-delete saved__address-button common__button">Удалить</button>
          </div>
        </div>
      `;
      savedAddressList.insertAdjacentHTML("beforeend", cardHTML);
    });

    // Update addressCount to continue from the last number
    addressCount = savedAddresses.length + 1;

    // Setup event listeners for loaded cards
    setupSelectButtons();
    setupDeleteButtons();
    showSelectedAddressInPayment();
  }
}

// Load saved addresses when page loads
document.addEventListener("DOMContentLoaded", loadSavedAddresses);

// card.classList.add('hide__card');
// setTimeout(() => card.remove(), 300);

// Writing JS for the checkout address section
// const addressForm = document.getElementById('addressForm');
// const addressResult = document.getElementById('addressResult');

// addressForm.addEventListener('submit', function(event) {
//   event.preventDefault();

//   const formData = new FormData(addressForm);
//   const data = {};

//   formData.forEach((value, key) => {
//     data[key] = value;
//   });

//   addressResult.textContent = `Адрес сохранён: ${data.name} ${data.surname}, ${data.street}, ${data.city}, ${data.zipcode}, ${data.country}`;
//   addressForm.reset();
// });

window.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const container = document.querySelector(".wall");
  const summaryTotal = document.querySelector(".order__summary-amount");

  if (!container) {
    console.warn("Cart container not found");
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const card = document.createElement("div");
    card.className = "wall__card";
    card.innerHTML = `
      <label class="samin-checkbox">
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
      <img class="wall__card-image" src="${item.image}" alt="Product" />
      <div class="wall__text">
        <h3 class="wall__title">${item.productName}</h3>
        <p class="wall__when">Завтра по клику</p>
      </div>
      <div class="wall__amount">
        <div class="wall__price">${item.price} ₽</div>
        <div class="quantity">
          <button class="quantity__minus" data-index="${index}">-</button>
          <p class="quantity__amount">${item.quantity}</p>
          <button class="quantity__plus" data-index="${index}">+</button>
        </div>
      </div>
      <button class="remove__item" data-index="${index}">x</button>
    `;

    container.appendChild(card);
  });

  if (summaryTotal) {
    summaryTotal.textContent = `${total} ₽`;
  }

  setupQuantityListeners();
  // Вешаем обработчики на все кнопки удаления
  document.querySelectorAll(".remove__item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.dataset.index);

      // Получаем и обновляем localStorage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Удаляем карточку из DOM
      const cardElement = button.closest(".wall__card");
      if (cardElement) {
        cardElement.classList.add("fade-out");
        setTimeout(() => {
          cardElement.remove();

          // Переназначить индексы после удаления
          document
            .querySelectorAll(".remove__item")
            .forEach((btn, i) => (btn.dataset.index = i));
          document
            .querySelectorAll(".quantity__plus")
            .forEach((btn, i) => (btn.dataset.index = i));
          document
            .querySelectorAll(".quantity__minus")
            .forEach((btn, i) => (btn.dataset.index = i));

          updateCartSummary(cartItems);
          updateFloatingCartCounter();
          renderCartProductLine();
          updatePaymentSummaryAndDelivery();
        }, 300);
      }

      // Переназначаем индексы кнопкам после удаления
      document
        .querySelectorAll(".remove__item")
        .forEach((btn, i) => (btn.dataset.index = i));
      document
        .querySelectorAll(".quantity__plus")
        .forEach((btn, i) => (btn.dataset.index = i));
      document
        .querySelectorAll(".quantity__minus")
        .forEach((btn, i) => (btn.dataset.index = i));

      // Обновляем сумму и кол-во
      updateCartSummary(cartItems);
      updateFloatingCartCounter();
      renderCartProductLine();
    });
  });

  function setupQuantityListeners() {
    const container = document.querySelector(".wall");
    if (!container) return;

    // Удаляем предыдущие обработчики, если есть
    container.replaceWith(container.cloneNode(true));
    const newContainer = document.querySelector(".wall");
    if (!newContainer) return;

    newContainer.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("quantity__plus") ||
        event.target.classList.contains("quantity__minus")
      ) {
        const index = parseInt(event.target.dataset.index);
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        if (event.target.classList.contains("quantity__plus")) {
          cartItems[index].quantity += 1;
        } else if (
          event.target.classList.contains("quantity__minus") &&
          cartItems[index].quantity > 1
        ) {
          cartItems[index].quantity -= 1;
        }

        // Сохраняем
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Обновляем DOM
        updateQuantityAndPrice(index);
        updateCartSummary(cartItems);
        updateFloatingCartCounter();
        renderCartProductLine();
        updatePaymentSummaryAndDelivery();
      }
    });
  }

  function updateQuantityAndPrice(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const quantityElems = document.querySelectorAll(".quantity__amount");
    const priceElems = document.querySelectorAll(".wall__price");

    if (quantityElems[index] && priceElems[index]) {
      quantityElems[index].textContent = cartItems[index].quantity;
      const totalItemPrice = cartItems[index].price * cartItems[index].quantity;
      priceElems[index].textContent = `${totalItemPrice} ₽`;
    }
  }

  // Обновить общую сумму
  function updateCartSummary(cartItems) {
    const summaryTotal = document.querySelector(".order__summary-amount");
    const summaryCount = document.querySelector(".order__items-quantity");
    const summaryPrice = document.querySelector(".order__items-price");

    let totalSum = 0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      totalSum += item.price * item.quantity;
      totalItems += item.quantity;
    });

    if (summaryTotal) summaryTotal.textContent = `${totalSum} ₽`;
    if (summaryCount) summaryCount.textContent = `${totalItems} товаров`;
    if (summaryPrice) summaryPrice.textContent = `${totalSum} ₽`;
  }

  // setupQuantityListeners();
  updateCartSummary(cartItems);
});

// Making the Checkout form to be sticky
const checkout = document.querySelector(".order");
const startTrigger = document.querySelector(".sticky__form-start-trigger");
const stopTrigger = document.querySelector(".cart-bottom-observer");

const startObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      const rect = checkout.getBoundingClientRect();
      checkout.style.width = `${rect.width}px`;
      checkout.style.left = `${rect.left}px`;
      checkout.style.height = `${checkout.offsetHeight}px`;
      checkout.style.position = "fixed";
      checkout.style.top = "20px";
      checkout.style.zIndex = "999";
      checkout.classList.add("sticky__checkout-form");
    } else {
      checkout.classList.remove("sticky__checkout-form");
      checkout.style.width = "";
      checkout.style.left = "";
      checkout.style.height = "";
      checkout.style.position = "";
      checkout.style.top = "";
      checkout.style.zIndex = "";
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px",
  }
);

startObserver.observe(startTrigger);

// Stop observer (чтобы отлипала при достижении низа)
window.addEventListener("scroll", () => {
  const checkout = document.querySelector(".order");
  const cartBottom = document.querySelector(".cart-bottom-observer");

  if (!checkout.classList.contains("sticky__checkout-form")) return;

  const checkoutBottom = checkout.getBoundingClientRect().bottom;
  const cartBottomTop = cartBottom.getBoundingClientRect().top;

  // Если нижняя граница формы доходит до нижнего конца контента — убираем fixed
  if (checkoutBottom >= cartBottomTop) {
    checkout.classList.remove("sticky__checkout-form");
    checkout.style.position = "";
    checkout.style.top = "";
    checkout.style.width = "";
    checkout.style.left = "";
    checkout.style.height = "";
    checkout.style.zIndex = "";
  }
});

// Trying to make a map
function initYandexMap() {
  const mapElement = document.getElementById("yamap");
  if (!mapElement) {
    console.warn("Map element not found");
    return;
  }

  const map = new ymaps.Map("yamap", {
    center: [55.751574, 37.573856],
    zoom: 10,
    controls: [],
  });

  let placemark;

  const updateMapByAddress = (address) => {
    ymaps.geocode(address).then((res) => {
      const geoObject = res.geoObjects.get(0);
      if (!geoObject) return;

      const coords = geoObject.geometry.getCoordinates();
      if (placemark) {
        placemark.geometry.setCoordinates(coords);
      } else {
        placemark = new ymaps.Placemark(
          coords,
          {},
          {
            preset: "islands#icon",
            iconColor: "#0095b6",
            draggable: true,
          }
        );
        map.geoObjects.add(placemark);
      }
      map.setCenter(coords, 16);
    });
  };

  // Автозаполнение по выбору подсказки
  const addressInput = document.getElementById("yamap-address");
  if (addressInput) {
    addressInput.addEventListener("change", () => {
      updateMapByAddress(addressInput.value);
    });
  }
}

// Initialize map only if ymaps is available
if (typeof ymaps !== "undefined") {
  ymaps.ready(() => {
    initYandexMap();
  });
}

// Connecting daData API for the address suggestion
const addressInput = document.getElementById("yamap-address");
if (addressInput) {
  const suggestBox = document.createElement("div");
  suggestBox.classList.add("dadata-suggest-box");
  document.body.appendChild(suggestBox);

  // Стили (можно перенести в CSS)
  Object.assign(suggestBox.style, {
    position: "absolute",
    border: "1px solid #ccc",
    background: "#fff",
    zIndex: 9999,
    display: "none",
    maxHeight: "200px",
    overflowY: "auto",
    fontSize: "14px",
    cursor: "pointer",
  });

  addressInput.addEventListener("input", async () => {
    const query = addressInput.value;
    if (query.length < 3) {
      suggestBox.style.display = "none";
      return;
    }

    try {
      const response = await fetch(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token 955c063e8c0a23970f308ba7658ee1ccb9c0f958",
          },
          body: JSON.stringify({ query }),
        }
      );

      const data = await response.json();
      suggestBox.innerHTML = "";

      data.suggestions.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item.value;
        div.style.padding = "8px 10px";
        div.addEventListener("click", () => {
          addressInput.value = item.value;
          const streetAddress = document.getElementById("streetAddress");
          const city = document.getElementById("city");
          const building = document.getElementById("building");
          const flat = document.getElementById("flat");
          const zipCode = document.getElementById("zipCode");

          if (streetAddress)
            streetAddress.value = item.data.street_with_type || "";
          if (city) city.value = item.data.city || item.data.settlement || "";
          if (building) building.value = item.data.building || "";
          if (flat) flat.value = item.data.flat || "";
          if (zipCode) zipCode.value = item.data.postal_code || "";

          suggestBox.style.display = "none";
        });
        suggestBox.appendChild(div);
      });

      const rect = addressInput.getBoundingClientRect();
      suggestBox.style.top = `${rect.bottom + window.scrollY}px`;
      suggestBox.style.left = `${rect.left + window.scrollX}px`;
      suggestBox.style.width = `${rect.width}px`;
      suggestBox.style.display = "block";
    } catch (error) {
      console.warn("Error fetching address suggestions:", error);
    }
  });

  // Скрытие подсказок при клике вне
  document.addEventListener("click", (e) => {
    if (!suggestBox.contains(e.target) && e.target !== addressInput) {
      suggestBox.style.display = "none";
    }
  });
}

// Writing JS for the add card modal
const addCardBtn = document.getElementById("add-card-btn");
const addCardModal = document.getElementById("add-card-modal");
const cardNumberInput = document.getElementById("card-number");
const addCardModalClose = document.getElementById("add-card-modal-close");
const addCardModalContent = addCardModal
  ? addCardModal.querySelector(".add-card-modal__content")
  : null;

function showAddCardModal() {
  if (!addCardModal || !addCardModalContent) return;
  addCardModal.style.display = "flex";
  addCardModalContent.classList.remove("modal-animate-out");
  addCardModalContent.classList.add("modal-animate-in");
  setTimeout(() => cardNumberInput && cardNumberInput.focus(), 100);
}

function hideAddCardModal() {
  if (!addCardModal || !addCardModalContent) return;
  addCardModalContent.classList.remove("modal-animate-in");
  addCardModalContent.classList.add("modal-animate-out");
  // Wait for animation to finish before hiding
  addCardModalContent.addEventListener("animationend", function handler(e) {
    if (e.animationName === "modalFadeOut") {
      addCardModal.style.display = "none";
      addCardModalContent.classList.remove("modal-animate-out");
      addCardModalContent.removeEventListener("animationend", handler);
    }
  });
}

if (addCardBtn && addCardModal) {
  addCardBtn.addEventListener("click", showAddCardModal);
}
if (addCardModalClose && addCardModal) {
  addCardModalClose.addEventListener("click", hideAddCardModal);
}
if (addCardModal) {
  const overlay = addCardModal.querySelector(".add-card-modal__overlay");
  if (overlay) {
    overlay.addEventListener("click", hideAddCardModal);
  }
}

// Delivery price calculation and update
function updateDeliveryPrice(total) {
  let delivery = 0;
  if (total > 5000) {
    delivery = 0;
  } else if (total > 0) {
    delivery = Math.ceil(total * 0.15);
  }
  // Calculate original delivery for strikethrough
  const originalDelivery = Math.ceil(total * 0.15);
  // Update delivery cost in payment summary
  const deliveryCostSpan = document.getElementById(
    "payment-summary-delivery-cost"
  );
  if (deliveryCostSpan) {
    if (delivery === 0 && total > 5000) {
      deliveryCostSpan.innerHTML = `<span style='text-decoration: line-through; color: #999;'>${originalDelivery}₽</span> <span style='color: #1dbf73; font-weight: 600;'>бесплатно</span>`;
    } else {
      deliveryCostSpan.innerHTML = `${delivery}₽`;
    }
  }
  // Update delivery cost in delivery method block
  const deliveryMethodCost = document.getElementById("payment-delivery-cost");
  if (deliveryMethodCost) {
    if (delivery === 0 && total > 5000) {
      deliveryMethodCost.innerHTML = `<span style='text-decoration: line-through; color: #999;'>${originalDelivery}₽</span> <span style='color: #1dbf73; font-weight: 600;'>бесплатно</span>`;
    } else {
      deliveryMethodCost.innerHTML = `${delivery}₽`;
    }
  }
  // Update delivery date buttons with new delivery cost
  updateDeliveryDateButtons(delivery, total);
  return delivery;
}

// Update delivery date buttons with current delivery cost
function updateDeliveryDateButtons(delivery, total) {
  const dateButtons = document.querySelectorAll(".payment__date-btn");
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const today = new Date();
  dateButtons.forEach((button, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1); // i+1 because buttons start from tomorrow
    const day = daysOfWeek[date.getDay()];
    const dayNum = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    let displayText = "";
    if (i === 0) {
      displayText = `Завтра, ${day} ${dayNum}.${month}`;
    } else if (i === 1) {
      displayText = `Послезавтра, ${day} ${dayNum}.${month}`;
    } else {
      displayText = `${day}, ${dayNum}.${month}`;
    }
    if (delivery === 0 && total > 5000) {
      const originalDelivery = Math.ceil(total * 0.15);
      button.innerHTML = `${displayText}<br><span style="text-decoration: line-through; color: #999;">${originalDelivery}₽</span><br><span style="color: #1dbf73; font-weight: 600;">бесплатно</span>`;
    } else {
      button.innerHTML = `${displayText}<br><span>${delivery}₽</span>`;
    }
  });
}

// Helper to get promocode discount (stub, replace with real logic if needed)
function getPromocodeDiscount() {
  // Example: get value from input or state
  const promoInput = document.querySelector(".payment__summary-promo");
  // For demo, let's say promo 'SAVE500' gives 500₽ off
  if (promoInput && promoInput.value.trim().toUpperCase() === "SAVE500") {
    return 500;
  }
  return 0;
}

// Update payment summary and delivery when cart changes
function updatePaymentSummaryAndDelivery() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = 0;
  let count = 0;
  cartItems.forEach((item) => {
    total += item.price * (item.quantity || 1);
    count += item.quantity || 1;
  });
  // Update product count and total
  const summaryProductsCount = document.getElementById(
    "payment-summary-products-count"
  );
  const summaryProductsTotal = document.getElementById(
    "payment-summary-products-total"
  );
  if (summaryProductsCount) {
    summaryProductsCount.textContent = count
      ? `${count} товар${count === 1 ? "" : count < 5 ? "а" : "ов"}`
      : "";
  }
  if (summaryProductsTotal) {
    summaryProductsTotal.textContent = total ? `${total}₽` : "";
  }
  // Update delivery
  const delivery = updateDeliveryPrice(total) || 0;
  // Get promocode discount
  const discount = getPromocodeDiscount();
  // Update discount display
  const discountSpan = document.querySelector(".payment__summary-discount");
  if (discountSpan) {
    discountSpan.textContent = discount ? `-${discount}₽` : "0₽";
    discountSpan.style.color = discount ? "#e53935" : "#888";
  }
  // Calculate final total
  let finalTotal = total - discount + delivery;
  if (finalTotal < 0) finalTotal = 0;
  // Update total in payment summary
  const summaryTotal = document.querySelector(".payment__summary-total");
  if (summaryTotal) {
    summaryTotal.textContent = `${finalTotal}₽`;
  }
}

// Listen for promocode input changes
const promoInput = document.querySelector(".payment__summary-promo");
if (promoInput) {
  promoInput.addEventListener("input", updatePaymentSummaryAndDelivery);
}

// Call on page load
updatePaymentSummaryAndDelivery();
// Also call after cart changes (add to your cart update logic if needed)
window.addEventListener("storage", updatePaymentSummaryAndDelivery);

// If you have cart update logic elsewhere, call updatePaymentSummaryAndDelivery() after cart changes.

// Render small product images, quantity, and total below delivery date block
function renderCartProductLine() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let productLine = document.getElementById("cart-product-line");
  if (!productLine) {
    // Create the container if it doesn't exist
    const togglesBlock = document.querySelector(".payment__toggles");
    if (!togglesBlock) return;
    productLine = document.createElement("div");
    productLine.id = "cart-product-line";
    productLine.style.display = "flex";
    productLine.style.gap = "22px";
    productLine.style.margin = "22px 0 0 0";
    productLine.style.alignItems = "center";
    productLine.style.flexWrap = "wrap";
    productLine.style.rowGap = "22px";
    togglesBlock.parentNode.insertBefore(productLine, togglesBlock.nextSibling);
  }
  productLine.innerHTML = "";
  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.style.display = "flex";
    itemDiv.style.flexDirection = "column";
    itemDiv.style.alignItems = "center";
    itemDiv.style.minWidth = "80px";
    // itemDiv.style.border = "2px solid #fff";
    // itemDiv.style.padding = "6px";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${
      item.productName
    }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); margin-bottom: 6px;">
      <span style="font-size: 15px; color: #222; font-weight: 500;">x${
        item.quantity
      }</span>
      <span style="font-size: 15px; color: #888;">${
        item.price * item.quantity
      }₽</span>
    `;
    productLine.appendChild(itemDiv);
  });
}

// Call on page load and after cart changes
renderCartProductLine();
window.addEventListener("storage", renderCartProductLine);
// If you update the cart elsewhere, call renderCartProductLine() after changes.

// --- Delivery Date Block Dynamic Generation and Selection ---
function renderDeliveryDateOptions() {
  const dateBlock = document.querySelector(".payment__date-options");
  if (!dateBlock) return;
  dateBlock.innerHTML = "";
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const today = new Date();

  // Get current delivery cost
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let delivery = 0;
  if (total > 5000) {
    delivery = 0;
  } else if (total > 0) {
    delivery = Math.ceil(total * 0.15);
  }

  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = daysOfWeek[date.getDay()];
    const dayNum = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    // Create display text with actual dates
    let displayText = "";
    if (i === 1) {
      displayText = `Завтра, ${day} ${dayNum}.${month}`;
    } else if (i === 2) {
      displayText = `Послезавтра, ${day} ${dayNum}.${month}`;
    } else {
      displayText = `${day}, ${dayNum}.${month}`;
    }

    const button = document.createElement("button");
    button.className = "payment__date-btn";

    // Set delivery cost display
    if (delivery === 0 && total > 5000) {
      // Calculate what the delivery cost would be (15% of total)
      const originalDelivery = Math.ceil(total * 0.15);
      button.innerHTML = `${displayText}<br><span style="text-decoration: line-through; color: #999;">${originalDelivery}₽</span><br><span style="color: #1dbf73; font-weight: 600;">бесплатно</span>`;
    } else {
      button.innerHTML = `${displayText}<br><span>${delivery}₽</span>`;
    }

    button.dataset.date = `${dayNum}.${month}`;

    // Add click event for selection
    button.addEventListener("click", function () {
      // Remove active class and checkmark from all buttons
      document.querySelectorAll(".payment__date-btn").forEach((btn) => {
        btn.classList.remove("payment__date-btn--active");
        // Remove checkmark if exists
        const existingCheck = btn.querySelector(".payment__date-btn-check");
        if (existingCheck) {
          existingCheck.remove();
        }
        // Reset to original state
        btn.style.background = "#f7f7f7";
        btn.style.border = "none";
      });

      // Add active class to clicked button
      this.classList.add("payment__date-btn--active");
      this.style.background = "#e8f5e8";
      this.style.border = "2px solid #1dbf73";

      // Add checkmark in top right corner
      const check = document.createElement("span");
      check.className = "payment__date-btn-check";
      check.textContent = "✅";
      check.style.cssText =
        "position: absolute; top: -8px; right: -8px; font-size: 0.85em; z-index: 2;";
      this.appendChild(check);
    });

    // Add hover effect
    button.addEventListener("mouseenter", function () {
      if (!this.classList.contains("payment__date-btn--active")) {
        this.style.background = "#f0f8f0";
        this.style.boxShadow = "0 2px 8px rgba(29, 191, 115, 0.15)";
      }
      // Add movement effect on hover
      this.style.transform = "translateY(-2px)";
      this.style.transition = "all 0.2s ease";
    });

    button.addEventListener("mouseleave", function () {
      if (!this.classList.contains("payment__date-btn--active")) {
        this.style.background = "#f7f7f7";
        this.style.boxShadow = "none";
      }
      // Remove movement effect
      this.style.transform = "translateY(0)";
    });

    dateBlock.appendChild(button);
  }

  // Set first option as active by default
  const firstButton = dateBlock.querySelector(".payment__date-btn");
  if (firstButton) {
    firstButton.click();
  }
}

document.addEventListener("DOMContentLoaded", renderDeliveryDateOptions);

// --- Automatic Split Tracker ---
(function setupAutoSplitTracker() {
  // Insert tracker if not present in both payment summary and order block
  function ensureTracker() {
    // Payment summary tracker
    if (!document.getElementById("auto-split-tracker")) {
      const summary = document.querySelector(".payment__summary");
      if (summary) {
        const tracker = document.createElement("div");
        tracker.id = "auto-split-tracker";
        tracker.style =
          "background: #fafafa; border-radius: 14px; margin: 18px 0 18px 0; padding: 18px 18px 12px 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);";
        tracker.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 1.1em; font-weight: 700; color: #222;">Ваш прогресс оформления заказа</span>
          </div>
          <div id="auto-split-progress-bar" style="position: relative; height: 12px; background: #e5e5e5; border-radius: 6px; margin: 12px 0 8px 0; overflow: visible;">
            <div id="auto-split-progress-fill" style="height: 100%; background: #1dbf73; border-radius: 6px; width: 0%; transition: width 0.4s;"></div>
            <img src="images/logo__walnuts-print-version.svg" id="auto-split-progress-logo" style="position: absolute; top: 50%; left: 0%; transform: translate(-50%, -50%); width: 28px; height: 28px; background: #fff; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.07); transition: left 0.4s; z-index: 2; border: 2px solid #1dbf73;" alt="Progress logo" />
          </div>
          <div style="display: flex; justify-content: space-between; color: #888; font-size: 1em;">
            <span id="auto-split-date">Улыбайтесь!</span>
            <span id="auto-split-remaining">Ещё 3 шага до оплаты</span>
          </div>
        `;
        summary.insertBefore(tracker, summary.firstChild);
      }
    }
    // Checkout form tracker
    if (!document.getElementById("auto-split-tracker-order")) {
      const order = document.querySelector(".order");
      if (order) {
        const tracker = document.createElement("div");
        tracker.id = "auto-split-tracker-order";
        tracker.style =
          "background: #fafafa; border-radius: 14px; margin: 0 0 18px 0; padding: 18px 18px 12px 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);";
        tracker.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 1.1em; font-weight: 700; color: #222;">Ваш прогресс оформления заказа</span>
          </div>
          <div id="auto-split-progress-bar-order" style="position: relative; height: 12px; background: #e5e5e5; border-radius: 6px; margin: 12px 0 8px 0; overflow: visible;">
            <div id="auto-split-progress-fill-order" style="height: 100%; background: #1dbf73; border-radius: 6px; width: 0%; transition: width 0.4s;"></div>
            <img src="images/logo__walnuts-print-version.svg" id="auto-split-progress-logo-order" style="position: absolute; top: 50%; left: 0%; transform: translate(-50%, -50%); width: 28px; height: 28px; background: #fff; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.07); transition: left 0.4s; z-index: 2; border: 2px solid #1dbf73;" alt="Progress logo" />
          </div>
          <div style="display: flex; justify-content: space-between; color: #888; font-size: 1em;">
            <span style="margin-top: 10px;" id="auto-split-date-order">Улыбайтесь!</span>
            <span id="auto-split-remaining-order">Ещё 3 шага до оплаты</span>
          </div>
        `;
        order.insertBefore(tracker, order.firstChild);
      }
    }
  }

  ensureTracker();

  // Tracker logic
  const steps = 4;
  const fill = () => document.getElementById("auto-split-progress-fill");
  const logo = () => document.getElementById("auto-split-progress-logo");
  const remaining = () => document.getElementById("auto-split-remaining");
  // For order block
  const fillOrder = () =>
    document.getElementById("auto-split-progress-fill-order");
  const logoOrder = () =>
    document.getElementById("auto-split-progress-logo-order");
  const remainingOrder = () =>
    document.getElementById("auto-split-remaining-order");

  function getStep() {
    let completed = 0;
    // Step 1: Cart has items
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length) completed++;
    // Step 2: Address selected
    const selectedAddressId = localStorage.getItem("selectedAddressId");
    if (selectedAddressId) completed++;
    // Step 3: Delivery date selected
    const activeDateBtn = document.querySelector(".payment__date-btn--active");
    if (activeDateBtn) completed++;
    // Step 4: Paid (simulate with .payment__pay-card click)
    if (window.__splitPaid) completed++;
    return completed;
  }

  function updateTracker() {
    ensureTracker();
    const step = getStep();
    const percent = (step / steps) * 100;
    // Payment summary tracker
    if (fill()) fill().style.width = percent + "%";
    if (logo()) logo().style.left = percent + "%";
    if (remaining()) {
      if (step < 4) {
        remaining().textContent = `Шаг ${step} из 4`;
      } else {
        remaining().textContent = "Выполнено!";
      }
    }
    // Order block tracker
    if (fillOrder()) fillOrder().style.width = percent + "%";
    if (logoOrder()) logoOrder().style.left = percent + "%";
    if (remainingOrder()) {
      if (step < 4) {
        remainingOrder().textContent = `Шаг ${step} из 4`;
      } else {
        remainingOrder().textContent = "Выполнено!";
      }
    }
  }

  // Listen for cart, address, date, and pay events
  window.addEventListener("storage", updateTracker);
  document.addEventListener("DOMContentLoaded", updateTracker);
  document.addEventListener("click", function (e) {
    // Address select or delivery date select
    if (
      e.target.classList.contains("saved__address-button-select") ||
      e.target.classList.contains("payment__date-btn")
    ) {
      setTimeout(updateTracker, 100);
    }
    // Pay button
    if (e.target.classList.contains("payment__pay-card")) {
      window.__splitPaid = true;
      updateTracker();
    }
  });
  // Also update on cart changes
  [
    "updateCartSummary",
    "updatePaymentSummaryAndDelivery",
    "renderCartProductLine",
    "setupSelectButtons",
    "setupDeleteButtons",
    "renderDeliveryDateOptions",
  ].forEach((fn) => {
    if (window[fn]) {
      const orig = window[fn];
      window[fn] = function (...args) {
        const res = orig.apply(this, args);
        updateTracker();
        return res;
      };
    }
  });
})();


// Dropdown functionality for the company info in the footer
function toggleCompanyInfo() {
  const info = document.getElementById("company-info");
  info.classList.toggle("open");
}