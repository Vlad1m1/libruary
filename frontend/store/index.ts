import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  authReducer,
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
