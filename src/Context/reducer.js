//import React, { useState, useReducer } from 'react';



let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).FirstName
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).JwtToken
  : "";
let id = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).Id
  : "";
let refreshToken = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).RefreshToken
  : "";
let email = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).Email
  : "";
let oUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).oUser
  : {};
export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
  id: id,
  refreshToken: refreshToken,
  email: email,
  oUser: oUser,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      //console.log("action payload", action.payload);
      //console.log("Reducer inital state", initialState);
      return {
        ...initialState,
        user: action.payload.FirstName,
        token: action.payload.JwtToken,
        loading: false,
        id: action.payload.Id,
        refreshToken: action.payload.RefreshToken,
        email: email,
        oUser: action.payload.oUser,
      };
    case "LOGOUT":
      return {
        user: "",
        token: "",
        loading: false,
        errorMessage: null,
        id: "",
        refreshToken: "",
        email: "",
        oUser: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
