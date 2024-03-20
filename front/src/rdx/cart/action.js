import cartActionTypes from './actionType';

export const addProductToCart = (payload) => ({
  type: cartActionTypes.ADD_PRODUCT,
  payload
});

export const cancelCart = () => ({
  type: cartActionTypes.CLEAR_CART
});

export const deleteProductFromCart = (payload) => ({
  type: cartActionTypes.DELETE_PRODUCT,
  payload
});