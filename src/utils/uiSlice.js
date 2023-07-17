import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile as updateUserProfileAPI } from './api';

export const updateUserProfile = createAsyncThunk(
  'api/updateUserProfile',
  async ({ token, firstName, lastName }, thunkAPI) => {
    try {
      const response = await updateUserProfileAPI(token, firstName, lastName);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
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
    updateUserProfile(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
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
