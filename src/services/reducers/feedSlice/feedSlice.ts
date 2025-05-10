import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);

type TFeedState = {
  isLoading: boolean;
  isError: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
  orders: TOrder[];
};

export const initialState: TFeedState = {
  isLoading: false,
  isError: false,
  feed: {
    total: 0,
    totalToday: 0
  },
  orders: []
};

export const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export default FeedSlice.reducer;
