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
function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError("quantity error");
  }

  const cartArr = [...cart];
  const existingProduct = cartArr.find((p) => p.id === productId);

  if (!existingProduct) {
    return cart;
  }

  if (quantity > existingProduct.stock) {
    throw new RangeError("quantity error");
  }

  existingProduct.quantity = quantity;

  return cartArr;
}
function removeFromCart(cart, productId) {
  return cart.filter((product) => product.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  const discount =
    promoCode === "SAVE10" && subtotal >= 20000
      ? Math.round(subtotal * 0.1)
      : 0;

  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
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
