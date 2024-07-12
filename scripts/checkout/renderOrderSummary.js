import { cart } from "../data/cart-class.js";
import { getProduct } from "../data/products.js";
import { getCost } from "../utils/cost.js"
import { deliveryOptions, getDeliveryOption} from "../data/delivery-options.js"
import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js'
import { renderPaymentSummary } from "./renderOrderPaymentSummary.js";

renderOrderSummary();
export function renderOrderSummary() {

  let cartProductsHTML = '';
  cart.cartItems.forEach(cartItem => {
    const matchingProduct = getProduct(cartItem.id);

    
    let deliveryOption = getDeliveryOption(cartItem);
    const today = dayjs();
    const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDay.format('dddd, MMMM D');
    
    cartProductsHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
  
              <span data-product-id="${matchingProduct.id}" class="update-quantity-link link-primary js-update-quantity-link">
                Update
              </span>
  
              <input type="text" class="input-quantity"/>
  
              <span class="save-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
  
              <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary js-delete-quantity-link">
                Delete
              </span>
            </div>

            <div class="extra-info-container">
              <span class="info-${matchingProduct.id}">
                ${cartItem.info}
              </span>

              <span class="extra-info-select">
                ${matchingProduct.extraInfo(matchingProduct.id)}
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            ${deliveryDate(cartItem)}
            
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector('.js-order-summary')
  .innerHTML = cartProductsHTML;

  document.querySelectorAll('.js-product-info-container')
  .forEach(select => {
    select.addEventListener('change', () => {
      const {productId} = select.dataset;
      const info = select.value;
      document.querySelector(`.info-${productId}`).textContent = info;
      cart.updateInfo(productId, info)
    });
  });

  function deliveryDate(cartItem) {
    let deliveryDateHTML = '';

    deliveryOptions.forEach(deliveryOption => {
      const today = dayjs();
      const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDay.format('dddd, MMMM D');
      const deliveryCost = deliveryOption.priceCents ? `$${getCost(deliveryOption.priceCents)}` : 'FREE Shipping';

      deliveryDateHTML += `
        <div class="delivery-option js-delivery-option" 
            data-delivery-id="${deliveryOption.deliveryId}" 
            data-product-id="${cartItem.id}">
          <input type="radio" ${cartItem.deliveryId === deliveryOption.deliveryId ? 'checked' : ""}
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${deliveryCost}
            </div>
          </div>
        </div>
      `
    });
    return deliveryDateHTML;
  };


  document.querySelectorAll('.js-delivery-option').forEach(option => {
    option.addEventListener('click', () => {
      const {deliveryId, productId} = option.dataset;

      cart.updateDeliveryOption(deliveryId, productId);
      renderOrderSummary();
      renderPaymentSummary();

    })
  })

  // Show Total Quantity at the header
  updateCheckoutTitle();
  function updateCheckoutTitle() {
    let totalQuantity = 0;
    cart.cartItems.forEach(cartItem => {
      totalQuantity += cartItem.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML = totalQuantity
  };
  
  // Delete Selected Product
  document.querySelectorAll('.js-delete-quantity-link')
  .forEach(deleteLink => {
    deleteLink.addEventListener('click', () => {
      const {productId} = deleteLink.dataset;
      const productContainerElem = document.querySelector(`.js-cart-item-container-${productId}`)
      productContainerElem.remove();
      cart.removeItemFromCart(productId);
      updateCheckoutTitle();
      renderPaymentSummary();
    });
  });

  
  //Update Cart Quantity
  let productContainer;
  document.querySelectorAll('.js-update-quantity-link')
  .forEach(updateLink => {
    updateLink.addEventListener('click', () => {
      const {productId} = updateLink.dataset;
      productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      productContainer.classList.add('product-container');
    });
  });
  document.querySelectorAll('.js-save-link')
  .forEach(link => {
    link.addEventListener('click', (e) => {
      const {productId} = e.target.dataset;
      let quantity = Number(document.querySelector(`.product-container .input-quantity`).value);
      quantity < 1 ? quantity = 1 : 
      productContainer.classList.remove('product-container');
      
      cart.updateSelectedItemQuantity(productId, quantity);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
};


