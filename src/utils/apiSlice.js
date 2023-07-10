import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, login } from "./api";

export const fetchUserProfile = createAsyncThunk(
  "api/fetchUserProfile",
  async (token) => {
    const response = await getUserProfile(token);
    return response;
  }
);

export const loginAsync = createAsyncThunk(
  "api/login",
  async ({ email, password }) => {
    const response = await login(email, password);
    return response;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export default apiSlice.reducer;
