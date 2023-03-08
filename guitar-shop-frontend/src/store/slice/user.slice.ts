/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';
import { SliceEnum } from '../../common/enum/slice.enum';

type InitialStateUserSliceType = {
  isAuthorization: boolean;
};

const initialStateUserSlice: InitialStateUserSliceType = {
  isAuthorization: false,
};

export const userSlice = createSlice({
  name: SliceEnum.UserSlice,
  initialState: initialStateUserSlice,
  reducers: {
    setIsAuthorizationAction: (state, action) => {
      state.isAuthorization = action.payload;
    },
  },
});

export const { setIsAuthorizationAction, } = userSlice.actions;
