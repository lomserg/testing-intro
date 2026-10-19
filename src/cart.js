function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0 || quantity > product.stock)
    throw new RangeError("quantity error");
  let cartArr = [...cart];
  const existingProduct = cartArr.find((p) => p.id === product.id);
  if (existingProduct) {
    if (existingProduct.quantity + quantity > product.stock) {
      throw new RangeError("quantity error");
    }
    existingProduct.quantity += quantity;
  } else {
    cartArr.push({ ...product, quantity });
  }

  return cartArr;
}
function changeQuantity() {
  return notImplemented();
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
