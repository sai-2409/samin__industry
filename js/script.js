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