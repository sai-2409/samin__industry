// Fixing the header to be sticky
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const navHeight = nav.getBoundingClientRect().height;
  
  const stickyNav = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
  });

  headerObserver.observe(header);

// Fixing the header to be sticky

// Scrolling to sections smoothly
const btnScrollTo1 = document.querySelector('.nav__link--1');



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