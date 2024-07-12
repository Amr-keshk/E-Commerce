import { cart } from './data/cart-class.js';
import { products } from './data/products.js';


let productsGrid = '';
products.forEach(product => {
  productsGrid += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getRatingImage()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="option-container">
        <div class="product-quantity-container">
          <select class="js-product-quantity-selected-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        
        <div class="product-info-container js-product-info-container-${product.id}">
            ${product.extraInfo()}
        </div>

        
      </div>
      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.products-grid').innerHTML = productsGrid;

let timeoutIdObject = {};

document.querySelectorAll('.js-add-to-cart-button')
  .forEach(button => {
    button.addEventListener('click', () => {
      
      const {productId} = button.dataset;
      const quantity = Number(document.querySelector(`.js-product-quantity-selected-${productId}`).value);
      const info = document.querySelector(`.js-product-info-container-${productId} .js-product-info-container`) ? 
      document.querySelector(`.js-product-info-container-${productId} .js-product-info-container`).value : '';

      cart.addToCart(productId, quantity, info);
      getCartQuantity();
      renderAddedMessage(productId);
    });
});

function renderAddedMessage(productId) {
  const addedImage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedImage.style.opacity = 1;

  if(timeoutIdObject[productId]) {
    clearTimeout(timeoutIdObject[productId]);
  }

  const timeoutId = setTimeout(() => {
    addedImage.style.opacity = 0;
  }, 2000);

  timeoutIdObject[productId] = timeoutId;
};

getCartQuantity();
function getCartQuantity() {
  let cartQuantity = 0;
  cart.cartItems.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};

