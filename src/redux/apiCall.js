import axios from "axios";
import { startLogin, successLogin, errorLogin } from "./reducer/userSlicer";
import { startRegister, successRegister, errorRegister } from "./reducer/registerSlicer";
import { startLogout, successLogout, errorLogout } from "./reducer/logoutSlice";
import { getProduct } from "./reducer/productSlicer";

// api
import API_URL from "../backend";

export const loginUser = async (userData, dispatch) => {
  dispatch(startLogin());
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    setTimeout(() => {
      dispatch(successLogin(response.data));
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      dispatch(errorLogin());
    }, 2000);
  }
};

export const registerUser = async (userData, dispatch) => {
  dispatch(startRegister());
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    setTimeout(() => {
      dispatch(successRegister(response.data));
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      dispatch(errorRegister());
    }, 2000);
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(startLogout());
  try {
    await axios.delete(`${API_URL}/logout`);
    setTimeout(() => {
      dispatch(successLogout());
    }, 0);
  } catch (err) {
    setTimeout(() => {
      dispatch(errorLogout());
    }, 0);
  }
};

export const getProducts = async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    dispatch(getProduct(response.data));
  } catch (err) {
    dispatch(err);
  }
};
