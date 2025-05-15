// Coding JS code for the index.html
// Setting variables for the first time 
const header = document.querySelector('.header');
const headerCart = document.querySelector('.header__cart');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const headerButton = document.querySelector('.header__button');
const headerButton2 = document.querySelector('.mbutton1');
const headerButtonCalc = document.querySelector('.mbutton2');
const section3 = document.getElementById('section__3');
const sectionCalc = document.getElementById('section__calc');

// Going to the cart with headerCart
headerCart.addEventListener('click', function() {
  window.location.href = 'cartSamin.html';
});

// Scrolling to Menu section with headerButton 
headerButton.addEventListener('click', function() {
  section3.scrollIntoView({ behavior: 'smooth'});
});
// Scrolling to Menu from another common button
headerButton2.addEventListener('click', function() {
  section3.scrollIntoView({ behavior: 'smooth'});
});
// Scrolling  to Calculator section with headerButton
headerButtonCalc.addEventListener('click', function() {
  sectionCalc.scrollIntoView({behavior: 'smooth'});
});
// Fixing the header to be sticky  
  // const stickyNav = function(entries) {
  //   const [entry] = entries;

  //   if (!entry.isIntersecting) nav.classList.add('sticky');
  //   else nav.classList.remove('sticky');
  // };

  // const headerObserver = new IntersectionObserver(stickyNav, {
  // root: null,
  // threshold: 0,
  // rootMargin: `-${navHeight}px`
  // });

  // headerObserver.observe(header);

// Fixing the header to be sticky


// Making menu fade animation 
const HandleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.header__logo');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  };
};

nav.addEventListener('mouseover', HandleHover.bind(0.5));
nav.addEventListener('mouseout', HandleHover.bind(1));
// Making menu fade animation 




// I should fix this code (slider for cards, functionalities, etc.)
const cards = document.querySelectorAll('.card-card');
let currentIndex = 1;

function updateSlider() {
  cards.forEach((card, index) => {
    card.classList.remove('active');
  });
  cards[currentIndex].classList.add('active');
}

cards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    currentIndex = index;
    updateSlider();
  });
});

updateSlider();

// Working with counter for the Cart and this shit is working man for now ! 
const cartCounter = document.querySelector('.floating__cart-counter');
const btnCart = document.querySelectorAll('.card__cart');

btnCart.forEach((btnItem) => {
  btnItem.addEventListener('click', () => {
    let currentCount = parseInt(cartCounter.textContent);
    cartCounter.textContent = currentCount + 1;
  });
});

// Making tracker of the website interactive

// Here is coding for the cartSamin.js
// const minusBtn = document.querySelectorAll('.product__cart-min');
// const plusBtn = document.querySelectorAll('.product__cart-plus');

// minusBtn.forEach(btn => {
//   btn.addEventListener('click', () => {
//     let currentCount = parseInt(cartCounter.textContent);
//     cartCounter.textContent = currentCount - 1;
//   });
// });
