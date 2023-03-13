import { combineReducers } from '@reduxjs/toolkit';
import { SliceEnum } from '../common/enum/slice.enum';
import { cartSlice } from './slice/cart.slice';
import { dataSlice } from './slice/data.slice';
import { modalSlice } from './slice/modal.slice';
import { orderSlice } from './slice/order.slice';
import { productsSlice } from './slice/products.slice';
import { reviewSlice } from './slice/review.slice';
import { userSlice } from './slice/user.slice';


export const commonReducer = combineReducers({
  [SliceEnum.UserSlice]: userSlice.reducer,
  [SliceEnum.DataSlice]: dataSlice.reducer,
  [SliceEnum.ProductsSlice]: productsSlice.reducer,
  [SliceEnum.ModalSlice]: modalSlice.reducer,
  [SliceEnum.CartSlice]: cartSlice.reducer,
  [SliceEnum.ReviewSlice]: reviewSlice.reducer,
  [SliceEnum.OrderSlice]: orderSlice.reducer,
});
