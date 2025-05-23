// Coding JS code for the index.html
// Setting variables for the first time 
const header = document.querySelector('.header');
const headerCart = document.querySelector('.header__cart');
const nav = document.querySelector('.nav');
// const navHeight = nav.getBoundingClientRect().height;
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
const stickyObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-1px' // чтобы сработало сразу как ушло
  }
);
stickyObserver.observe(header);

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

// Working with counter for the Cart and this shit is working man for now ! 
const cartCounter = document.querySelector('.floating__cart-counter');
const btnCart = document.querySelectorAll('.card__cart');

btnCart.forEach((btnItem) => {
  btnItem.addEventListener('click', () => {
    let currentCount = parseInt(cartCounter.textContent);
    cartCounter.textContent = currentCount + 1;
  });
});



// Reveal sections 
// const allSections = document.querySelectorAll('.section')

// const revealSection = function(entries, observer) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove('section__hidden');
//   observer.unobserve(entry.target);
// };
// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0,

// });
// allSections.forEach(function(section) {
//   sectionObserver.observe(section);
//   section.classList.add('section__hidden');
// });



// Coding slider for the cardsM
const sliders = document.querySelectorAll('.cardM__slider');

sliders.forEach((currentCard) => {
  const images = currentCard.querySelectorAll('.cardM__slider-img');
  let currentIndex = 0;
  let canSlide = true;

  currentCard.addEventListener('mousemove', (e) => {
    if (!canSlide) return; // Stop if not allowed yet

    const rect = currentCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const middle = rect.width / 2;

    if (x > middle && currentIndex < images.length - 1) {
      images[currentIndex].classList.remove('active');
      currentIndex++;
      images[currentIndex].classList.add('active');
      canSlide = false;
    } else if (x < middle && currentIndex > 0) {
      images[currentIndex].classList.remove('active');
      currentIndex--;
      images[currentIndex].classList.add('active');
      canSlide = false;
    }

    // Cooldown: allow sliding again after 1 second (1000ms)
    setTimeout(() => {
      canSlide = true;
    }, 400);
  });
});


// Playing with the cartCard Button
const cartCardButton = document.querySelector('.card__cart');
const cartCardAmount = document.querySelector('.card__cart-amount');

cartCardButton.addEventListener('click', function() {
  let currentCardAmount = parseInt(cartCardAmount.textContent);
  cartCardAmount.textContent = currentCardAmount + 1;

  cartCardAmount.style.opacity = 1;
});
