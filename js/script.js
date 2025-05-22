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
  // nav.classList.remove('sticky');
// Fixing the header to be sticky

// Making slider for the menu section 
// const slider = document.querySelector('.cardM__slider')
// const images = slider.querySelectorAll('.cardM__slider-img');
// let current = 0;
// let timer;

// function showImage(index) {
//   images.forEach((img, i) => img.classList.toggle('active', i === index));
// };
// function startSlider() {
//   timer = setInterval(() => {
//     current = (current + 1) % images.length;
//     showImage(current);
//   }, 400);
// }
// function stopSlider() {
//   clearInterval(timer); 
// };
// slider.addEventListener('mouseenter', startSlider);
// slider.addEventListener('mouseleave', stopSlider);

// Making slider for the menu section 




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



// Reveal sections 
const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section__hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,

});
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section__hidden');
});


// Tryna config delete button for the cartSamin page
// const deleteButton = document.querySelectorAll('.remove__item');

// deleteButton.forEach(button => {
//   button.addEventListener('click', function() {
//     console.log('did I click ?')
//   });
// });

// Coding slider for the cardsM
const slider = document.getElementById('cardmSlider');
  const images = slider.querySelectorAll('.cardM__slider-img');
  let currentIndex = 0;

  slider.addEventListener('mousemove', (e) => {
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const middle = rect.width / 2;

    if (x > middle && currentIndex < images.length - 1) {
      images[currentIndex].classList.remove('active');
      currentIndex++;
      images[currentIndex].classList.add('active');
    } else if (x < middle && currentIndex > 0) {
      images[currentIndex].classList.remove('active');
      currentIndex--;
      images[currentIndex].classList.add('active');
    }
  });
