import * as types from "./actionType";
import axios from "axios";

const API = "http://localhost:5000";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userAdded = (msg) => ({
  type: types.ADD_USER,
  payload: msg,
});

const getSingleUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

const userDelete = (msg) => ({
  type: types.DELETE_USER,
  payload: msg,
});

const userUpdate = (msg) => ({
  type: types.UPDATE_USER,
  payload: msg,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${API}/users`)
      .then((resp) => dispatch(getUsers(resp.data)))
      .catch((err) => console.log(err));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${API}/createUser`, user)
      .then((resp) => {
        dispatch(userAdded(resp.data.message));
        dispatch(loadUsers());
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${API}/users/${id}`)
      .then((resp) => {
        dispatch(userDelete(resp.data.message));
        dispatch(loadUsers());
      })
      .catch((err) => console.log(err));
  };
};

export const loadSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${API}/users/${id}`)
      .then((resp) => {
        dispatch(getSingleUser(resp.data));
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${API}/users/${id}`, user)
      .then((resp) => {
        dispatch(userUpdate(resp.data.message));
        dispatch(loadUsers());
      })
      .catch((err) => console.log(err));
  };
};
