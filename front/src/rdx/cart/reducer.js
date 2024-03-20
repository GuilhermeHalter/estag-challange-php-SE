import cartActionTypes from "./actionType";

const initialState = {
  products: [],
  productsTotalPrice: 0,
  productsTotalTax: 0,
  productsTotalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT:
      const productIsAlreadyInCart = state.products.some(
        (product) => product.code == action.payload.code
      );
      console.log(action.payload.code);
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.code == action.payload.code) {
              return {
                ...product,
                amount:
                  parseInt(product.amount) + parseInt(action.payload.amount),
              };
            } else {
              return product;
            }
          }),
        };
      }

      return {
        ...state,
        products: [
          ...state.products,
          { ...action.payload, amount: action.payload.amount },
        ],
      };


    case cartActionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
        productsTotalPrice: 0,
        productsTotalTax: 0,
        productsTotalAmount: 0,
      };



    case cartActionTypes.DELETE_PRODUCT:
      if (state.products.length == 0) {
        return {
          ...state,
          products: [],
        };
      }
      return {
        ...state,
        products: state.products.filter(
          (product) => product.code !== action.payload
        ),
      };

    default:
      return state;
  }
};


export default cartReducer;