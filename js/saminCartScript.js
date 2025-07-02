// Tryna config delete button for the cartSamin page
const deleteButton = document.querySelectorAll(".remove__item");
const showCardBtn = document.getElementById("show__card-info");
const cardInformation = document.querySelector(".card-form-container");
const addressFillForm = document.querySelector(".checkout__block-link-address");
const addressForm = document.querySelector(".common__container-address-form");
const checkoutFormButton = document.querySelector(".order__button");

// Writing function for the toggling forms
const toggleForm = (formName, infoForm) => {
  formName.addEventListener("click", function () {
    infoForm.classList.toggle("section__hidden");
  });
};

// Moving to Order Checkout
checkoutFormButton.addEventListener("click", function () {
  document
    .querySelector(".checkout__header-h1")
    .scrollIntoView({ behavior: "smooth" });
});

// deleteButton.forEach(button => {
//   button.addEventListener('click', function() {
//     const card = button.closest('.wall__card');
//     if (card) card.remove();
//   });
// });

// Showing card informaion in saminCart
toggleForm(showCardBtn, cardInformation);
// Showing address fillout form
toggleForm(addressFillForm, addressForm);

// Bro, you know the filling when it seems that everything is going amazing, and you have a lot of stuff to do, at the same moment you wanna
// chill and enjoy your life. I can not chill, not now !
// Trying to save address when user clicks on save address button

const form = document.querySelector(".address-form__form");
const savedAddressList = document.getElementById("savedAddressList");
let addressCount = 1;

// Load saved addresses from localStorage on page load
let savedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
let selectedAddressId = localStorage.getItem("selectedAddressId") || null;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const street = document.getElementById("streetAddress").value;
  const city = document.getElementById("city").value;
  const building = document.getElementById("building").value;
  const flat = document.getElementById("flat").value;
  const zipCode = document.getElementById("zipCode").value;

  // Create address object
  const addressData = {
    id: Date.now(), // Unique ID for each address
    fullName,
    street,
    city,
    building,
    flat,
    zipCode,
    number: addressCount,
  };

  // Add to savedAddresses array
  savedAddresses.push(addressData);

  // Save to localStorage
  localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));

  const cardHTML = `
  
  <div class="saved-address__card" width = "100%" data-address-id="${
    addressData.id
  }">
        <div class="saved-address__number">${addressCount}</div>
        <div class="saved-address__info">
          <div class="saved-address__name-row" style="display: flex; justify-content: space-between; align-items: center;">
            <div class="saved-address__name">${fullName}</div>
            ${
              addressData.phone
                ? `<span class="saved-address__phone" style="color: #888; font-size: 0.98em; margin-left: 16px;">${addressData.phone}</span>`
                : ""
            }
          </div>
          <div class="saved-address__text">${street}</div>
          <div class="saved-address__text">${city}, ${zipCode}</div>
          <div class="saved-address__text">д${building}, кв${flat}</div>
        </div>
        <div class="saved-address__actions">
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
});

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

        card.classList.add("slideInRight");
        setTimeout(() => {
          card.remove();
          // Renumber all remaining cards after deletion
          renumberAddressCards();
        }, 300);
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
            <button class="saved-address__button saved__address-button-select common__button ${
              isSelected ? "selected" : ""
            }">${isSelected ? "Выбран" : "Выбрать"}</button>
            <button class="saved-address__button saved__address-button-delete common__button">Удалить</button>
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

  summaryTotal.textContent = `${total} ₽`;

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

      // ❗ Переназначаем обработчики кнопок + и - с новым массивом
      // setupQuantityListeners();

      // Обновляем сумму и кол-во
      updateCartSummary(cartItems);
      updateFloatingCartCounter();
    });
  });

  function setupQuantityListeners() {
    const container = document.querySelector(".wall");

    // Удаляем предыдущие обработчики, если есть
    container.replaceWith(container.cloneNode(true));
    const newContainer = document.querySelector(".wall");

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
      }
    });
  }

  function updateQuantityAndPrice(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const quantityElems = document.querySelectorAll(".quantity__amount");
    const priceElems = document.querySelectorAll(".wall__price");

    quantityElems[index].textContent = cartItems[index].quantity;
    const totalItemPrice = cartItems[index].price * cartItems[index].quantity;
    priceElems[index].textContent = `${totalItemPrice} ₽`;
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

    summaryTotal.textContent = `${totalSum} ₽`;
    summaryCount.textContent = `${totalItems} товаров`;
    summaryPrice.textContent = `${totalSum} ₽`;
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
  addressInput.addEventListener("change", () => {
    updateMapByAddress(addressInput.value);
  });
}
ymaps.ready(() => {
  initYandexMap();
});

// Connecting daData API for the address suggestion
const addressInput = document.getElementById("yamap-address");
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
      document.getElementById("streetAddress").value =
        item.data.street_with_type || "";
      document.getElementById("city").value =
        item.data.city || item.data.settlement || "";
      document.getElementById("building").value = item.data.building || "";
      document.getElementById("flat").value = item.data.flat || "";
      document.getElementById("zipCode").value = item.data.postal_code || "";
      suggestBox.style.display = "none";
    });
    suggestBox.appendChild(div);
  });

  const rect = addressInput.getBoundingClientRect();
  suggestBox.style.top = `${rect.bottom + window.scrollY}px`;
  suggestBox.style.left = `${rect.left + window.scrollX}px`;
  suggestBox.style.width = `${rect.width}px`;
  suggestBox.style.display = "block";
});

// Скрытие подсказок при клике вне
document.addEventListener("click", (e) => {
  if (!suggestBox.contains(e.target) && e.target !== addressInput) {
    suggestBox.style.display = "none";
  }
});
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
