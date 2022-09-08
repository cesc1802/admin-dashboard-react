import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";

// Define a type for the slice state
interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

// Define the initial state using that type
const initialState = {
  isAuthenticated: false,
  username: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<string>) => ({
      ...state,
      username: action.payload,
      isAuthenticated: true,
    }),
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthenticationStatus = (state: RootState) => !!state.auth.isAuthenticated;

export default authSlice.reducer;
