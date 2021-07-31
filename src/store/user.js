import axios from "axios"
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"


//----------LOG----------

export const registerUser = createAsyncThunk("REGISTER", ({userEmail, userPass}) => {
  return axios.post("/api/register", {
    email: userEmail.target.value,
    password: userPass.target.value
  })
})

export const sendLoginRequest = createAsyncThunk("LOGIN", ({userEmail, userPass}) => {
  return axios.post("/api/login", {
    email: userEmail.target.value,
    password: userPass.target.value
  })
})

export const sendLogOutRequest = createAsyncThunk("LOGOUT", () => {
  return axios.post("/api/logout")
})

export const getUser = createAsyncThunk("GET_USER", (id) => {
  if(!id) return axios.get(`/api/user`).then((res) => res.data)
  return axios.get(`/api/user?userId=${id}`).then((res) => res.data)
})



//--------REDUCERS--------

const userReducer = createReducer([], {
  [registerUser.fulfilled]: (state, action) => action.payload,
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogOutRequest.fulfilled]: (state, action) => action.payload,
  [getUser.fulfilled]: (state, action) => action.payload
});

export default userReducer;