/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';
import { SliceEnum } from '../../common/enum/slice.enum';
import { ModalNameType } from '../../common/type/modal-name.type';
import { ProductCardDataType } from '../../common/type/product-card-data.type';


type InitialStateCreateSliceType = {
  openModal: ModalNameType | null;
  currentTargetAddCartProductData: ProductCardDataType | null;
};

const initialStateCreateSlice: InitialStateCreateSliceType = {
  openModal: null,
  currentTargetAddCartProductData: null,
};


export const modalSlice = createSlice({
  name: SliceEnum.ModalSlice,
  initialState: initialStateCreateSlice,
  reducers: {
    setOpenModalAction: (state, action) => {
      state.openModal = action.payload;
    },
    setCurrentTargetAddCartProductDataAction: (state, action) => {
      state.currentTargetAddCartProductData = action.payload;
    },
  },
});

export const { setOpenModalAction, setCurrentTargetAddCartProductDataAction } = modalSlice.actions;
