export const selectProductsCount = (rootReducer) => {
  return rootReducer.cartReducer.products.reduce((acc, curr) => acc + curr.amount, 0);
};

export const selectProductsTotalPrice = (rootReducer) => {
  return rootReducer.cartReducer.products.reduce((acc, item) => acc + (item.price * item.amount) + (item.tax * item.amount), 0);
};

export const selectProductsTotalTax = (rootReducer) => {
  return rootReducer.cartReducer.products.reduce((acc, item) => acc + (item.tax * item.amount), 0);
};

export const selectCancelPurchase = (rootReducer) => {
  return rootReducer.cartReducer.products.length === 0;
};