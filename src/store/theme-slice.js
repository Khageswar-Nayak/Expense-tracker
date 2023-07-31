import { createSlice } from "@reduxjs/toolkit";

const initialthemeState = {
  showTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialthemeState,
  reducers: {
    setTheme(state) {
      state.showTheme = !state.showTheme;
    },
  },
});

export const themeAuction = themeSlice.actions;

export default themeSlice.reducer;
