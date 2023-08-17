import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile, login } from './api';

export const loginAsync = createAsyncThunk(
  'api/login',
  async ({ email, password }) => {
    const response = await login(email, password);
    return response;
  }
);

export const fetchUserProfile = createAsyncThunk(
  'api/fetchUserProfile',
  async (token) => {
    const response = await getUserProfile(token);
    return response;
  }
);

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    email: '',
    password: '',
    token: null,
    user: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    disconnectUser: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
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

export const { setEmail, setPassword, setToken, disconnectUser } =
  apiSlice.actions;

export default apiSlice.reducer;
