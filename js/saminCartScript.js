// Tryna config delete button for the cartSamin page
const deleteButton = document.querySelectorAll('.remove__item');
const showCardBtn = document.getElementById('show__card-info');
const cardInformation = document.querySelector('.card-form-container')
const addressFillForm = document.querySelector('.checkout__block-link-address');
const addressForm = document.querySelector('.common__container-address-form')

// Writing function for the toggling forms 
const toggleForm = (formName, infoForm) => {
  formName.addEventListener('click', function() {
    infoForm.classList.toggle('section__hidden');
  });
};

deleteButton.forEach(button => {
  button.addEventListener('click', function() {
    const card = button.closest('.wall__card');
    if (card) card.remove();
  });
});

// Showing card informaion in saminCart
toggleForm(showCardBtn, cardInformation);
// Showing address fillout form
toggleForm(addressFillForm, addressForm);


// Bro, you know the filling when it seems that everything is going amazing, and you have a lot of stuff to do, at the same moment you wanna
// chill and enjoy your life. I can not chill, not now ! 
// Trying to save address when user clicks on save address button

const form = document.querySelector('.address-form__form');
const savedAddressList = document.getElementById('savedAddressList');
let addressCount = 1;

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const street = document.getElementById('streetAddress').value;
  const city = document.getElementById('city').value;
  const zipCode = document.getElementById('zipCode').value;

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
          <button class="saved-address__button common__button">Удалить</button>
        </div>
      </div>
  `
  savedAddressList.insertAdjacentHTML('beforeend', cardHTML);
  addressCount++;
  form.reset();

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


// I don't know what am I doing 
