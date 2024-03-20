import { userActionTypes } from "./types";

export const loginUser = (payload) => ({
  type: userActionTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({ 
    type: userActionTypes.LOGOUT 
    });