export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, quantity) {

  let matchingItem;
  cart.forEach(cartItem => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    };
  });

  if(!matchingItem) {
    cart.push({id:productId, quantity, deliveryId: 3});
  } else {
    matchingItem.quantity += quantity;
  };

  saveLocalStorage();
};

function saveLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function removeItemFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.id !== productId) {
      newCart.push(cartItem);
    };
  });

  cart = newCart;
  saveLocalStorage();
}

export function updateSelectedItemQuantity(productId, quantity) {
  let matchingItem;
  cart.forEach(cartItem => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    };
  });
  matchingItem.quantity = quantity;
  saveLocalStorage()

};

export function updateDeliveryOption(deliveryId, productId) {
  let matchingProduct;
  cart.forEach(cartItem => {
    if(cartItem.id === productId) {
      matchingProduct = cartItem;
    };
  });

  matchingProduct.deliveryId = Number(deliveryId);
  saveLocalStorage();
};