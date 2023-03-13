/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';
import { SliceEnum } from '../../common/enum/slice.enum';


type InitialStateUserSliceType = {
  isAuthorization: boolean;
  email: string | null;
  username: string | null;
  isAdmin: boolean;
};

const initialStateUserSlice: InitialStateUserSliceType = {
  isAuthorization: false,
  email: null,
  username: null,
  isAdmin: false,
};


export const userSlice = createSlice({
  name: SliceEnum.UserSlice,
  initialState: initialStateUserSlice,
  reducers: {
    setIsAuthorizationAction: (state, action) => {
      state.isAuthorization = action.payload;
    },
    setEmailAction: (state, action) => {
      state.email = action.payload;
    },
    setUsernameAction: (state, action) => {
      state.username = action.payload;
    },
    setIsAdminAction: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAuthorizationAction, setEmailAction, setUsernameAction, setIsAdminAction } = userSlice.actions;
