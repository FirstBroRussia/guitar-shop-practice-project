/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */

import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as HttpStatus from 'http-status';

import { store } from '../store';
import { axiosApi } from '../../common/api/axios.api';
import { setProductCardListAction, setProductCardDataAction, setCurrentProductQueryState } from '../slice/products.slice';
import { ProductCardListServerResponse } from './type/product-card-list-server-response.type';
import { CatalogStateType } from '../../common/type/catalog-state.type';
import { LoginServerResponseType } from './type/login-server-response.type';
import { LoginDataType } from '../../common/type/login-data.type';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { setEmailAction, setIsAdminAction, setIsAuthorizationAction, setUsernameAction } from '../slice/user.slice';
import { RegisterServerResponseType } from './type/register-server-response.type';
import { redirectToRouteAction, setNextRouteNavigateAction } from '../slice/data.slice';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { RegisterDataType } from '../../common/type/register-data.type';
import { ProductCardDataType } from '../../common/type/product-card-data.type';
import { setInitReviewListAction, setIsSendNewReviewAction, setReviewListAction } from '../slice/review.slice';
import { ReviewServerResponseType } from './type/review-server-response.type';
import { CreateReviewType } from '../../common/type/create-review.type';
import { setOpenModalAction } from '../slice/modal.slice';
import { CreateOrderType } from '../../common/type/create-order.type';
import { setIsCompleteSendOrderAction } from '../slice/cart.slice';
import { OrderDataServerResponseType } from './type/order-data-server-response.type';
import { setCurrentOrderQueryState, setOrderDataAction, setOrderListAction } from '../slice/order.slice';
import { OrderStateType } from '../../common/type/order-state.type';
import { OrderDataType } from '../../common/type/order-data.type';
import { CreateProductType } from '../../common/type/create-product.type';
import { UpdateProductDtoType } from '../../common/type/update-product-dto.type';


const logoutFn = () => {
  sessionStorage.removeItem(ConstantValueEnum.ACCESS_TOKEN);
  sessionStorage.removeItem(ConstantValueEnum.IS_AUTH_USER);
  sessionStorage.removeItem(ConstantValueEnum.IS_ADMIN_USER);

  store.dispatch(setIsAuthorizationAction(false));
  store.dispatch(setEmailAction(null));
  store.dispatch(setUsernameAction(null));
  store.dispatch(setIsAdminAction(false));

  store.dispatch(setNextRouteNavigateAction(RoutePathEnum.Main));

};

const errorHandle = (err: unknown): void => {
  const error = err as AxiosError;

  const toastNotify = store.getState().DataSlice.toastifyFn as Function;

  if (!error.response?.status) {
    console.error(error.response);

    toastNotify(`STATUS_CODE: ${HttpStatus.INTERNAL_SERVER_ERROR}`);

    return;
  }
  if (error.response?.status === 401) {
    sessionStorage.removeItem(ConstantValueEnum.ACCESS_TOKEN);
    sessionStorage.removeItem(ConstantValueEnum.IS_AUTH_USER);
    sessionStorage.removeItem(ConstantValueEnum.IS_ADMIN_USER);

    store.dispatch(setIsAuthorizationAction(false));
    store.dispatch(setEmailAction(null));
    store.dispatch(setUsernameAction(null));
    store.dispatch(setIsAdminAction(false));

    store.dispatch(setNextRouteNavigateAction(RoutePathEnum.Main));

    return;
  }
  if (error.response?.status === HttpStatus.INTERNAL_SERVER_ERROR) {
    console.error(error.response);

    toastNotify(`STATUS_CODE: ${HttpStatus.INTERNAL_SERVER_ERROR}`);

    return;
  }

  console.error(error.response.data);

  toastNotify((error.response.data as any).message);
};


export const asyncLoginAction = createAsyncThunk('login', async (dto: LoginDataType) => {

  try {
    const { accessToken, email, username, isAdmin } = (await axiosApi.post('auth/login', dto)).data as LoginServerResponseType;

    sessionStorage.setItem(ConstantValueEnum.ACCESS_TOKEN, accessToken);
    sessionStorage.setItem(ConstantValueEnum.IS_AUTH_USER, 'true');
    sessionStorage.setItem(ConstantValueEnum.IS_ADMIN_USER, 'true');

    store.dispatch(setIsAuthorizationAction(true));
    store.dispatch(setEmailAction(email));
    store.dispatch(setUsernameAction(username));
    store.dispatch(setIsAdminAction(isAdmin));

    store.dispatch(setNextRouteNavigateAction(RoutePathEnum.Main));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncLogoutAction = createAsyncThunk('logout', async () => {

  try {
    await axiosApi.get('auth/logout');

    logoutFn();
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncRegisterAction = createAsyncThunk('register', async (dto: RegisterDataType) => {

  try {
    (await axiosApi.post('auth/register', dto)).data as RegisterServerResponseType;

    store.dispatch(redirectToRouteAction(RoutePathEnum.Login));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncCheckTokenAction = createAsyncThunk('checkToken', async () => {

  try {
    const { email, username, isAdmin } = (await axiosApi.get('auth/checktoken')).data as LoginServerResponseType;

    sessionStorage.setItem(ConstantValueEnum.IS_AUTH_USER, 'true');
    sessionStorage.setItem(ConstantValueEnum.IS_ADMIN_USER, 'true');

    store.dispatch(setIsAuthorizationAction(true));
    store.dispatch(setEmailAction(email));
    store.dispatch(setUsernameAction(username));
    store.dispatch(setIsAdminAction(isAdmin));
  } catch (err) {
    logoutFn();

    errorHandle(err);
  }
});


export const asyncGetProductCardListAction = createAsyncThunk('products', async (searchQuery?: CatalogStateType) => {
  let query: CatalogStateType;

  if (searchQuery) {
    store.dispatch(setCurrentProductQueryState(searchQuery));

    query = searchQuery;
  } else {
    query = store.getState().ProductsSlice.currentProductQueryState!;
  }

  const { page, sort, guitarTypeArr, guitarStringsArr } = query;

  const guitarTypeStr = guitarTypeArr.join(',');
  const guitarStringsStr = guitarStringsArr.join(',');

  const searchString = `page=${page}&sort=${sort}${guitarTypeStr.length > 0 ? `&type=${guitarTypeStr}` : ''}${guitarStringsStr.length > 0 ? `&strings=${guitarStringsStr}` : ''}`;

  try {
    const result = (await axiosApi.get(`products?${searchString}`)).data as ProductCardListServerResponse;
    store.dispatch(setProductCardListAction(result));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncGetProductCardDataByIdAction = createAsyncThunk('products/:productId', async (productId: string) => {

  try {
    const result = (await axiosApi.get(`products/${productId}`)).data as ProductCardDataType;

    store.dispatch(setProductCardDataAction(result));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncGetReviewDataListByProductIdAction = createAsyncThunk('comments/:productId', async (isPushNextReviews?: boolean) => {

  try {
    const { id } = store.getState().ProductsSlice.productCardData as ProductCardDataType ;
    const page = store.getState().ReviewSlice.paginationPage;

    const result = (await axiosApi.get(`comments/${id}?page=${page}`)).data as ReviewServerResponseType;

    if (isPushNextReviews) {
      store.dispatch(setReviewListAction(result));
    } else {
      store.dispatch(setInitReviewListAction(result));
    }
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncPostNewReviewByProductIdAction = createAsyncThunk('comments/:productId', async (dto: CreateReviewType) => {

  try {
    await axiosApi.post('comments/', dto);

    store.dispatch(setIsSendNewReviewAction(true));
    store.dispatch(setOpenModalAction(null));
    store.dispatch(asyncGetProductCardDataByIdAction(store.getState().ProductsSlice.productCardData?.id as string));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncPostNewOrderAction = createAsyncThunk('orders', async (dto: CreateOrderType) => {

  try {
    await axiosApi.post('orders', dto);

    store.dispatch(setIsCompleteSendOrderAction(true));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncGetOrdersListAction = createAsyncThunk('orders', async (queryObj?: OrderStateType) => {
  let query: OrderStateType;

  if (queryObj) {
    store.dispatch(setCurrentOrderQueryState(queryObj));

    query = queryObj;
  } else {
    query = store.getState().OrderSlice.currentOrderQueryState!;
  }

  const { page, sort } = query;

  try {
    const result = (await axiosApi.get(`orders?page=${page}&sort=${sort}`)).data as OrderDataServerResponseType;

    store.dispatch(setOrderListAction(result));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncDeleteOrderByOrderIdAction = createAsyncThunk('orders/:orderId', async (orderId: string) => {

  try {
    await axiosApi.delete(`orders/${orderId}`);

    store.dispatch(asyncGetOrdersListAction());
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncGetOrderByOrderIdAction = createAsyncThunk('orders/:orderId', async (orderId: string) => {

  try {
    const result = (await axiosApi.get(`orders/${orderId}`)).data as OrderDataType;

    store.dispatch(setOrderDataAction(result));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncPostNewProductAction = createAsyncThunk('products', async (dto: CreateProductType) => {

  try {
    await axiosApi.post('products', dto);

    store.dispatch(setNextRouteNavigateAction(RoutePathEnum.ProductList));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncUpdateProductByProductIdAction = createAsyncThunk('products/:productId', async (dto: UpdateProductDtoType) => {
  const { productId, productData } = dto;

  try {
    await axiosApi.put(`products/${productId}`, productData);

    store.dispatch(asyncGetProductCardListAction());
    store.dispatch(setNextRouteNavigateAction(RoutePathEnum.ProductList));
  } catch (err) {
    errorHandle(err);
  }
});

export const asyncDeleteProductByProductIdAction = createAsyncThunk('products/:productId', async (productId: string) => {

  try {
    await axiosApi.delete(`products/${productId}`);

    store.dispatch(asyncGetProductCardListAction());
    store.dispatch(setNextRouteNavigateAction(RoutePathEnum.ProductList));
  } catch (err) {
    errorHandle(err);
  }
});
