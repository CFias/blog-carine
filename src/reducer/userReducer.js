import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    delUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, delUser } = userSlice.actions;

export default userSlice.reducer;