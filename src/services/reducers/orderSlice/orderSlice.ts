import { orderBurgerApi } from '@api';
import { TIngredient } from '@utils-types';
import { TOrder } from '@utils-types';
import { TConstructorIngredient } from '@utils-types';
import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit';

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
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type !== 'bun'
          ? state.constructorItems.ingredients.push(action.payload)
          : (state.constructorItems.bun = action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; offset: number }>
    ) => {
      const { index, offset } = action.payload;
      const items = [...state.constructorItems.ingredients];

      // Проверяем валидность индексов
      if (index < 0 || index >= items.length) return;
      const targetIndex = index + offset;
      if (targetIndex < 0 || targetIndex >= items.length) return;

      // Создаем новый массив с измененным порядком
      const newItems = [...items];
      [newItems[index], newItems[targetIndex]] = [
        newItems[targetIndex],
        newItems[index]
      ];
      state.constructorItems.ingredients = newItems;
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
