import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { axiosApi } from '../common/api/axios.api';
import { commonReducer } from './reducer';

enableMapSet();

export const store = configureStore({
  reducer: commonReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: axiosApi,
    },
    serializableCheck: false,
  }),
});

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
