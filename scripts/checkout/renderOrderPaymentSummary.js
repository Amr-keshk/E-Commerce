import { cart } from "../data/cart-class.js";
import { getProduct } from "../data/products.js";
import { getCost } from "../utils/cost.js";
import { getDeliveryOption } from "../data/delivery-options.js";
export function renderPaymentSummary() {


  let itemsPrice = 0;
  let shippingCost = 0;
  let totalQuantity = 0;
  cart.cartItems.forEach(cartItem => {
    const matchingProduct = getProduct(cartItem.id);
    const priceCEnts = matchingProduct.priceCents;
    const quantity = cartItem.quantity;
    totalQuantity += quantity;
    itemsPrice += priceCEnts * quantity ;
    shippingCost += getDeliveryOption(cartItem).priceCents;
  });

  const totalBeforeTax = itemsPrice + shippingCost;
  const estimatedTax = (10 / 100) * totalBeforeTax;
  const orderTotalCost = totalBeforeTax + estimatedTax;

  const paymentHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">$${getCost(itemsPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${getCost(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${getCost(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${getCost(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${getCost(orderTotalCost)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentHTML ;
};