/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';

import { SliceEnum } from '../../common/enum/slice.enum';
import { RoutePathType } from '../../common/type/route-path.type';

type InitialStateDataSliceType = {
  currentPath: RoutePathType | null;
  nextRouteNavigate: RoutePathType | null;

  toastifyFn: unknown | null;
};

const initialStateDataSlice: InitialStateDataSliceType = {
  currentPath: null,
  nextRouteNavigate: null,

  toastifyFn: null,
};


export const dataSlice = createSlice({
  name: SliceEnum.DataSlice,
  initialState: initialStateDataSlice,
  reducers: {
    setCurrentPathAction: (state, action) => {
      state.currentPath = action.payload;
    },
    redirectToRouteAction: (state, action) => {
      location.href = action.payload;
    },
    setNextRouteNavigateAction: (state, action) => {
      state.nextRouteNavigate = action.payload;
    },
    setToastifyFnAction: (state, action) => {
      state.toastifyFn = action.payload;
    },
  },
});

export const { setCurrentPathAction, redirectToRouteAction, setNextRouteNavigateAction, setToastifyFnAction } = dataSlice.actions;
