import { orderBurgerApi } from '@api';
import { TIngredient } from '@utils-types';
import { TOrder } from '@utils-types';
import { TConstructorIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

type TNewOrderState = {
  isLoading: boolean;
  isError: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TNewOrderState = {
  isLoading: false,
  isError: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'newOrder',
  initialState,
  selectors: {
    getNewOrderData: (state) =>
      state.constructorItems.bun?._id
        ? [
            state.constructorItems.bun?._id,
            ...state.constructorItems.ingredients.map((item) => item._id),
            state.constructorItems.bun?._id
          ]
        : []
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      action.payload.type !== 'bun'
        ? (state.constructorItems.ingredients = [
            ...state.constructorItems.ingredients,
            { ...action.payload, id: action.payload._id }
          ])
        : (state.constructorItems.bun = {
            ...action.payload,
            id: nanoid()
          });
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; offset: number }>
    ) => {
      const { index, offset } = action.payload;
      const arr = state.constructorItems.ingredients.slice();

      if (index + offset >= arr.length || index + offset < 0) {
        return state;
      }

      arr.splice(index + offset, 0, arr.splice(index, 1)[0]);

      state.constructorItems.ingredients = arr;
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, idx) => idx !== action.payload
        );
    },
    clearOrderConstructor: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = state.isLoading = true;
        state.isError = false;
        state.orderModalData = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = state.isLoading = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = state.isLoading = false;
        state.isError = true;
        state.orderModalData = null;
      });
  }
});

export const {
  addIngredient,
  moveIngredient,
  deleteIngredient,
  clearOrderConstructor
} = orderSlice.actions;

export const orderBurger = createAsyncThunk(
  'newOrder/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const { getNewOrderData } = orderSlice.selectors;

export default orderSlice.reducer;
