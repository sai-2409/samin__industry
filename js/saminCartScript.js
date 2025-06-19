// Tryna config delete button for the cartSamin page
const deleteButton = document.querySelectorAll(".remove__item");
const showCardBtn = document.getElementById("show__card-info");
const cardInformation = document.querySelector(".card-form-container");
const addressFillForm = document.querySelector(".checkout__block-link-address");
const addressForm = document.querySelector(".common__container-address-form");
const checkoutFormButton = document.querySelector(".order__button")

// Writing function for the toggling forms
const toggleForm = (formName, infoForm) => {
  formName.addEventListener("click", function () {
    infoForm.classList.toggle("section__hidden");
  });
};

// Moving to Order Checkout
checkoutFormButton.addEventListener("click", function() {
  document.querySelector(".checkout__header-h1").scrollIntoView({behavior: 'smooth'});
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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const street = document.getElementById("streetAddress").value;
  const city = document.getElementById("city").value;
  const zipCode = document.getElementById("zipCode").value;

  const cardHTML = `
  
  <div class="saved-address__card" width = "100%">
        <div class="saved-address__number">${addressCount}</div>
        <div class="saved-address__info">
          <div class="saved-address__name">${fullName}</div>
          <div class="saved-address__text">${street}</div>
          <div class="saved-address__text">${city}, ${zipCode}</div>
        </div>
        <div class="saved-address__actions">
          <button class="saved-address__button common__button">Изменить</button>
          <button class="saved-address__button saved__address-button-delete common__button">Удалить</button>
        </div>
      </div>
  `;
  savedAddressList.insertAdjacentHTML("beforeend", cardHTML);
  addressCount++;
  form.reset();
  document.querySelector('.saved__address-button-delete').addEventListener('click', function() {
    const card = this.closest('.saved-address__card');
    if (card) {
      card.classList.add('hide__card');
      setTimeout(() => card.remove(), 300);
    }
  });
});

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
const checkout = document.querySelector('.order');
const startTrigger = document.querySelector('.sticky__form-start-trigger');
const stopTrigger = document.querySelector('.cart-bottom-observer');

const startObserver = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) {
    const rect = checkout.getBoundingClientRect();
    checkout.style.width = `${rect.width}px`;
    checkout.style.left = `${rect.left}px`;
    checkout.style.height = `${checkout.offsetHeight}px`;
    checkout.style.position = 'fixed';
    checkout.style.top = '20px';
    checkout.style.zIndex = '999';
    checkout.classList.add('sticky__checkout-form');
  } else {
    checkout.classList.remove('sticky__checkout-form');
    checkout.style.width = '';
    checkout.style.left = '';
    checkout.style.height = '';
    checkout.style.position = '';
    checkout.style.top = '';
    checkout.style.zIndex = '';
  }
}, {
  root: null,
  threshold: 0,
  rootMargin: "0px"
});

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
    checkout.style.position = '';
    checkout.style.top = '';
    checkout.style.width = '';
    checkout.style.left = '';
    checkout.style.height = '';
    checkout.style.zIndex = '';
  }
});





