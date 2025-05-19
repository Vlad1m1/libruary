import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { isAuth } from "@/utils/isAuth";

export interface IAuth {
  isAuth: boolean;
}

const initialState: IAuth = {
  isAuth: isAuth(),
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    change(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export default AuthSlice.reducer;
