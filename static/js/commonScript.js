function getTotalCartQuantity() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);

  console.log('Total cart quantity:', totalQuantity);
}
getTotalCartQuantity();

// Updating the floating cart counter
function updateFloatingCartCounter() {
  const counter = document.querySelector('.floating__cart-counter');
  if (counter) {
    counter.textContent = getTotalCartQuantity();
  }
}