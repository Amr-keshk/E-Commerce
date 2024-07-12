class Cart {

  // Any property we need it to run at first we must run it in constructor
  // Like we need to import from localStorage so we have to put cartItems in constructor to run immediatly at first and import from local storage
  //Any property in class won't run else we put it in constructor or call it like (cart.property) outside the class
  localStorageKey;
  cartItem;
  constructor(key) {
    this.localStorageKey = key;
    this.cartItems  = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  };

  addToCart (productId, quantity, info) {

    let matchingItem = this.getMatchingItem(productId);
  
    if(!matchingItem) {
      this.cartItems.push({id:productId, quantity, deliveryId: 2, info});
    } else {
      matchingItem.quantity += quantity;
    };
    
    this.saveLocalStorage();
  };

  saveLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  };

  removeItemFromCart (productId) {
    const newCart = [];
    this.cartItems.forEach(cartItem => {
      if (cartItem.id !== productId) {
        newCart.push(cartItem);
      };
    });
  
    this.cartItems = newCart;
    this.saveLocalStorage();
  };

  updateSelectedItemQuantity (productId, quantity) {
    let matchingItem = this.getMatchingItem(productId);
    matchingItem.quantity = quantity;
    this.saveLocalStorage();
  };

  updateDeliveryOption (deliveryId, productId) {
    let matchingItem = this.getMatchingItem(productId);
    matchingItem.deliveryId = Number(deliveryId);
    this.saveLocalStorage();
  };

  updateInfo(productId, info) {
    let matchingItem = this.getMatchingItem(productId);
    matchingItem.info = info;
    this.saveLocalStorage();
  }

  getMatchingItem(productId) {
    let matchingItem;
    this.cartItems.forEach(cartItem => {
      if (cartItem.id === productId) {
        matchingItem = cartItem;
      };
    });

    return matchingItem;
  }

};

export const cart = new Cart('cartClass');
