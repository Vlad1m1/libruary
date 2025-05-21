import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/AuthSlice";
import languagesReducer from "./reducers/LanguageSlice";

const rootReducer = combineReducers({
  authReducer,
  languagesReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
