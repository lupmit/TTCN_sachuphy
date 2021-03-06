import { convert } from "../help/convert";
const initial = {
  cartList: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: parseInt(localStorage.getItem("total"))
    ? localStorage.getItem("total")
    : 0,
};

const cartReducer = (state = initial, action) => {
  switch (action.type) {
    case "ADD_CART": {
      let temp = convert(state.cartList, action.item, "add");

      return {
        ...state,
        cartList: temp,
        total: state.total + action.price,
      };
    }
    case "DELETE_ITEM": {
      let temp = convert(state.cartList, action.item, "delete");

      return {
        ...state,
        cartList: temp,
        total: state.total - action.price,
      };
    }
    case "CHANGE_NUMBER": {
      const prevNumber = state.cartList[action.key].number;
      state.cartList[action.key].number = action.value;
      return {
        ...state,
        total: state.total + (action.value - prevNumber) * action.price,
      };
    }
    case "DELETE": {
      state.cartList.splice(action.index, 1);
      const temp = state.cartList;

      return {
        ...state,
        cartList: temp,
        total: state.total - action.total,
      };
    }
    case "GET_CART_SUCCESS": {
      // let temp = convertItem(state.cartList,action);

      let totalPrice = 0;
      if (!action.fetchCart.length) totalPrice = 0;
      else {
        for (let i = 0; i < action.fetchCart.length; i++) {
          totalPrice += action.fetchCart[i].total;
        }
      }

      return {
        ...state,
        cartList: action.fetchCart ? action.fetchCart : [],
        total: totalPrice,
      };
    }
    // case "CHANGE_TOTAL": {
    //
    //
    //   return {
    //     ...state,
    //     total: action.total
    //   }
    // }
    case "RESET_DATA": {
      return {
        ...state,
        cartList: [],
        total: 0,
      };
    }
    default: {
      return state;
    }
  }
};
export default cartReducer;
