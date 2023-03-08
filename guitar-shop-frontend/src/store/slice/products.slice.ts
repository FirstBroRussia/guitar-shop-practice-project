/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';
import { SliceEnum } from '../../common/enum/slice.enum';
import { ProductCardServerResponseType } from '../../common/type/product-card-server-response.type';

type InitialStateProductsSliceType = {
  productCardList: ProductCardServerResponseType | null;
};

const initialStateProductsSlice: InitialStateProductsSliceType = {
  productCardList: null,
};


export const productsSlice = createSlice({
  name: SliceEnum.ProductsSlice,
  initialState: initialStateProductsSlice,
  reducers: {
    setProductCardListAction: (state, action) => {
      state.productCardList = action.payload;
    },
  },
});

export const { setProductCardListAction } = productsSlice.actions;
