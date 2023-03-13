import { createSlice } from '@reduxjs/toolkit';
import { SliceEnum } from '../../common/enum/slice.enum';
import { ReviewServerResponseType } from '../async-action/type/review-server-response.type';


type InitialStateReviewSliceType = {
  reviewListAndCount: ReviewServerResponseType;
  lastIncomingReviewCount: number;
  paginationPage: number;
  isSendNewReview: boolean;
};

const initialStateReviewSlice: InitialStateReviewSliceType = {
  reviewListAndCount: [[], 0],
  lastIncomingReviewCount: 0,
  paginationPage: 1,
  isSendNewReview: false,
};


export const reviewSlice = createSlice({
  name: SliceEnum.ReviewSlice,
  initialState: initialStateReviewSlice,
  reducers: {
    setInitReviewListAction: (state, action: {
      payload: ReviewServerResponseType;
      type: string;
    }) => {
      state.reviewListAndCount = action.payload;

      state.lastIncomingReviewCount = action.payload[0].length;
    },
    setReviewListAction: (state, action: {
      payload: ReviewServerResponseType;
      type: string;
    }) => {
      const reviews = action.payload[0];
      const count = action.payload[1];

      state.reviewListAndCount[0].push(...reviews);
      state.reviewListAndCount[1] = count;

      state.lastIncomingReviewCount = action.payload[0].length;
    },
    setPaginationPageAction: (state, action: {
      payload: number;
      type: string;
    }) => {
      state.paginationPage = action.payload;
    },
    setIsSendNewReviewAction: (state, action: {
      payload: boolean;
      type: string;
    }) => {
      state.isSendNewReview = action.payload;
    },
  },
});

export const { setInitReviewListAction, setReviewListAction, setPaginationPageAction, setIsSendNewReviewAction } = reviewSlice.actions;
