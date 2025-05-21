import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ILanguage } from "@/types/api/ILanguage";

const initialState: ILanguage[] = [];

export const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    updateLanguages(state, action: PayloadAction<ILanguage[]>) {
      return action.payload;
    },
  },
});

export const { updateLanguages } = LanguageSlice.actions;

export default LanguageSlice.reducer;
