/* eslint-disable no-console */

import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { store } from '../store';
import { axiosApi } from '../../common/api/axios.api';
import { ProductCardServerResponseType } from '../../common/type/product-card-server-response.type';
import { setProductCardListAction } from '../slice/products.slice';


export const asyncGetProductCardListAction = createAsyncThunk('products', async (searchString: string) => {
  console.log(searchString);

  try {
    const result = (await axiosApi.get(`products?${searchString}`)).data as ProductCardServerResponseType;
    console.log(result);
    store.dispatch(setProductCardListAction(result));
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response?.status) {
      console.error(error.response);

      return;
    }

    console.error(error.response.data);
  }
});
