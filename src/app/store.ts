import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { talentsApi } from "./services/talents";

const customMiddleWares = [talentsApi.middleware];

export const store = configureStore({
  reducer: {
    [talentsApi.reducerPath]: talentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleWares),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
