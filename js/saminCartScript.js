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
