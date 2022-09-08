import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";

// Define a type for the slice state
interface AppState {
  isReady: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  isReady: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeAppStatusToReady: (state) => ({ ...state, isReady: true }),
  },
});

export const { changeAppStatusToReady } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppStatus = (state: RootState) => !!state.app.isReady;

export default authSlice.reducer;
