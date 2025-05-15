// Fixing the header to be sticky
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const navHeight = nav.getBoundingClientRect().height;
  
  const stickyNav = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  };
  console.log(navHeight);

  const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
  });

  headerObserver.observe(header);

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

