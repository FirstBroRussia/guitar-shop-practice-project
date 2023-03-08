import { combineReducers } from '@reduxjs/toolkit';
import { SliceEnum } from '../common/enum/slice.enum';
import { dataSlice } from './slice/data.slice';
import { productsSlice } from './slice/products.slice';
import { userSlice } from './slice/user.slice';

export const commonReducer = combineReducers({
  [SliceEnum.UserSlice]: userSlice.reducer,
  [SliceEnum.DataSlice]: dataSlice.reducer,
  [SliceEnum.ProductsSlice]: productsSlice.reducer,
});
