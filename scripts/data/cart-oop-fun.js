function Cart(localStorageKey) {
  const cart = {
  
    cartItems: JSON.parse(localStorage.getItem(localStorageKey)) || [
      {
        id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryId: 1
      },
      {
        id: '54e0eccd-8f36-462b-b68a-8182611d9add',
        quantity: 1,
        deliveryId: 2
      }
    ],
  
    addToCart (productId, quantity) {
    
      let matchingItem;
      this.cartItems.forEach(cartItem => {
        if (cartItem.id === productId) {
          matchingItem = cartItem;
        };
      });
    
      if(!matchingItem) {
        this.cartItems.push({id:productId, quantity, deliveryId: 3});
      } else {
        matchingItem.quantity += quantity;
      };
    
      this.saveLocalStorage();
    },
  
    saveLocalStorage () {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    removeItemFromCart (productId) {
      const newCart = [];
      this.cartItems.forEach(cartItem => {
        if (cartItem.id !== productId) {
          newCart.push(cartItem);
        };
      });
    
      this.cartItems = newCart;
      this.saveLocalStorage();
    },
  
    updateSelectedItemQuantity (productId, quantity) {
      let matchingItem;
      this.cartItems.forEach(cartItem => {
        if (cartItem.id === productId) {
          matchingItem = cartItem;
        };
      });
  
      matchingItem.quantity = quantity;
      this.saveLocalStorage();
    },
    
    updateDeliveryOption (deliveryId, productId) {
      let matchingProduct;
      this.cartItems.forEach(cartItem => {
        if(cartItem.id === productId) {
          matchingProduct = cartItem;
        };
      });
  
      matchingProduct.deliveryId = Number(deliveryId);
      saveLocalStorage();
    },
  
  };

  return cart;

};
const cart = Cart('cart-oop-fun');
const businessCart = Cart('cart-oop-fun1');

console.log(cart);
console.log(businessCart);


