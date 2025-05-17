// Tryna config delete button for the cartSamin page
const deleteButton = document.querySelectorAll('.remove__item');

deleteButton.forEach(button => {
  button.addEventListener('click', function() {
    const card = button.closest('.wall__card');
    if (card) card.remove();
  });
});
// card.classList.add('hide__card');
// setTimeout(() => card.remove(), 300);