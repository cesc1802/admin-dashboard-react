import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import appReducer from "./reducers/app";
import authReducer from "./reducers/auth";

import { STORAGE_KEY_PREFIX, STORAGE_KEY_OF_APP, STORAGE_KEY_OF_AUTH } from "@/configs/constants";

const persistAppConfig = {
  keyPrefix: STORAGE_KEY_PREFIX,
  key: STORAGE_KEY_OF_APP,
  storage,
  blacklist: ["isReady"],
};

const persistAuthConfig = {
  keyPrefix: STORAGE_KEY_PREFIX,
  key: STORAGE_KEY_OF_AUTH,
  storage,
};

const rootReducer = combineReducers({
  app: persistReducer(persistAppConfig, appReducer),
  auth: persistReducer(persistAuthConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
