import { createSlice } from '@reduxjs/toolkit';
import { SliceEnum } from '../../common/enum/slice.enum';
import { OrderDataType } from '../../common/type/order-data.type';
import { OrderStateType } from '../../common/type/order-state.type';
import { OrderDataServerResponseType } from '../async-action/type/order-data-server-response.type';


type InitialStateOrderSliceType = {
  orderList: OrderDataType[] | null;
  orderCount: number;
  currentOrderQueryState: OrderStateType | null;

  orderData: OrderDataType | null;
};

const initialStateOrderSlice: InitialStateOrderSliceType = {
  orderList: null,
  orderCount: 0,
  currentOrderQueryState: null,

  orderData: null,
};


export const orderSlice = createSlice({
  name: SliceEnum.OrderSlice,
  initialState: initialStateOrderSlice,
  reducers: {
    setOrderListAction: (state, action: {
      payload: OrderDataServerResponseType;
      type: string;
    }) => {
      state.orderList = action.payload[0];
      state.orderCount = action.payload[1];
    },
    setCurrentOrderQueryState: (state, action: {
      type: string;
      payload: OrderStateType | null;
    }) => {
      state.currentOrderQueryState = action.payload;
    },
    setOrderDataAction: (state, action: {
      payload: OrderDataType;
      type: string;
    }) => {
      state.orderData = action.payload;
    },
  },
});

export const { setOrderListAction, setCurrentOrderQueryState, setOrderDataAction } = orderSlice.actions;
