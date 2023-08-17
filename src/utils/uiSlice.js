import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile as updateUserProfileAPI } from './api';
import { createGlobalStyle } from 'styled-components';

export const updateUserProfile = createAsyncThunk(
  'api/updateUserProfile',
  async ({ token, firstName, lastName }) => {
      const response = await updateUserProfileAPI(token, firstName, lastName);
      return response;
  }
);

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isEditingName: false,
    token: null,
    user: {},
  },
  reducers: {
    toggleEditName(state) {
      state.isEditingName = !state.isEditingName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
    });
  },
});

export const { toggleEditName } = uiSlice.actions;

export default uiSlice.reducer;
