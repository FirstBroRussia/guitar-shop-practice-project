/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';
import { ProductCardListServerResponse } from '../async-action/type/product-card-list-server-response.type';
import { SliceEnum } from '../../common/enum/slice.enum';
import { ProductCardDataType } from '../../common/type/product-card-data.type';
import { CatalogStateType } from '../../common/type/catalog-state.type';

type InitialStateProductsSliceType = {
  productCardListData: ProductCardListServerResponse | null;
  productCardData: ProductCardDataType | null;

  currentProductQueryState: CatalogStateType | null;
};

const initialStateProductsSlice: InitialStateProductsSliceType = {
  productCardListData: null,
  productCardData: null,

  currentProductQueryState: null,
};


export const productsSlice = createSlice({
  name: SliceEnum.ProductsSlice,
  initialState: initialStateProductsSlice,
  reducers: {
    setProductCardListAction: (state, action) => {
      state.productCardListData = action.payload;
    },
    setProductCardDataAction: (state, action) => {
      state.productCardData = action.payload;
    },
    setCurrentProductQueryState: (state, action) => {
      state.currentProductQueryState = action.payload;
    },
  },
});

export const { setProductCardListAction, setProductCardDataAction, setCurrentProductQueryState } = productsSlice.actions;
