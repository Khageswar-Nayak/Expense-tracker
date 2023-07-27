import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: true,
  token: "",
  email: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.email = action.payload.email;
    },
    logout(state) {
      state.token = "";
      state.email = "";
    },
    setLogin(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});
console.log(initialAuthState);

export const authActions = authSlice.actions;

export default authSlice.reducer;
