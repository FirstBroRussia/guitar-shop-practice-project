/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';

import { SliceEnum } from '../../common/enum/slice.enum';
import { RoutePathType } from '../../common/type/route-path.type';

type InitialStateDataSliceType = {
  currentPath: RoutePathType | null;
};

const initialStateDataSlice: InitialStateDataSliceType = {
  currentPath: null,
};


export const dataSlice = createSlice({
  name: SliceEnum.DataSlice,
  initialState: initialStateDataSlice,
  reducers: {
    setCurrentPathAction: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export const { setCurrentPathAction } = dataSlice.actions;
