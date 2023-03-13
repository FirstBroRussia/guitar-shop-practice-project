/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createSlice } from '@reduxjs/toolkit';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { ProductCardDataType } from '../../common/type/product-card-data.type';

export type ProductCartType = {
  productData: ProductCardDataType;
  count: number;
};

type InitialStateCartSliceType = {
  productCartList: Map<string, ProductCartType>;
  productCartCount: number;

  targetDeleteProductCartData: ProductCartType | null;

  isCompleteSendOrder: boolean | null;
};

const initialStateCartSlice: InitialStateCartSliceType = {
  productCartList: new Map<string, ProductCartType>(),
  productCartCount: 0,

  targetDeleteProductCartData: null,

  isCompleteSendOrder: null,
};


export const cartSlice = createSlice({
  name: SliceEnum.CartSlice,
  initialState: initialStateCartSlice,
  reducers: {
    addProductInProductCartAction: (state, action: {
      payload: ProductCardDataType;
      type: string;
    }) => {
      const product = action.payload;

      const existElement = state.productCartList.get(product.id);

      if (existElement) {
        state.productCartList.set(product.id, {
          ...existElement,
          count: existElement.count + 1,
        });
      } else {
        state.productCartList.set(product.id, {
          productData: product,
          count: 1,
        });
      }

      state.productCartCount += 1;
    },
    incrementProductInProductCartAction: (state, action) => {
      const product = action.payload as ProductCardDataType;

      const existElement = state.productCartList.get(product.id);

      if (existElement) {
        state.productCartList.set(product.id, {
          ...existElement,
          count: existElement.count + 1,
        });
      } else {
        return;
      }

      state.productCartCount += 1;
    },
    decrementProductInProductCartAction: (state, action) => {
      const product = action.payload as ProductCardDataType;

      const existElement = state.productCartList.get(product.id);

      if (existElement) {
        state.productCartList.set(product.id, {
          ...existElement,
          count: existElement.count - 1,
        });
      } else {
        return;
      }

      state.productCartCount -= 1;

      if (state.productCartList.get(product.id)?.count === ConstantValueEnum.ZERO_VALUE) {
        state.productCartList.delete(product.id);
      }
    },
    removeProductInProductCartAction: (state, action) => {
      const id = action.payload as string;

      const count = state.productCartList.get(id)?.count as number;

      state.productCartList.delete(id);
      state.productCartCount -= count;
    },
    setTargetDeleteProductCartDataAction: (state, action: {
      payload: ProductCartType;
      type: string;
    }) => {
      state.targetDeleteProductCartData = action.payload;
    },
    setIsCompleteSendOrderAction: (state, action) => {
      state.isCompleteSendOrder = action.payload;
    },
    resetCartSliceStateAction: (state) => {
      state.productCartList = new Map<string, ProductCartType>();
      state.productCartCount = 0;
    },
  },
});

export const { addProductInProductCartAction, incrementProductInProductCartAction, decrementProductInProductCartAction, removeProductInProductCartAction, setTargetDeleteProductCartDataAction, setIsCompleteSendOrderAction, resetCartSliceStateAction } = cartSlice.actions;
