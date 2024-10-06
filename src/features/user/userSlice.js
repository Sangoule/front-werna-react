// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    settings: {},
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { setProfile, updateSettings } = userSlice.actions;
export default userSlice.reducer;
