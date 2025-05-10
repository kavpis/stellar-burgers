import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  createAsyncThunk,
  createSlice,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  registerUserApi,
  TRegisterData,
  logoutApi,
  TLoginData,
  loginUserApi,
  getOrdersApi,
  updateUserApi,
  getUserApi
} from '@api';

type TUserState = {
  isLoading: boolean;
  isError: boolean;
  isCheckingAuth: boolean; // Новое состояние для проверки авторизации
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  orders: TOrder[];
  orderRequest: boolean;
};

// Начальное состояние
const initialState: TUserState = {
  isLoading: false,
  isError: false,
  isCheckingAuth: true, // Изначально true (проверка токенов)
  refreshToken: localStorage.getItem('refreshToken') ?? '',
  accessToken: '',
  user: null,
  orders: [],
  orderRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TUserState>) => {
    builder
      // Обработка логина
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
        setCookie('accessToken', action.payload.accessToken);
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
        setCookie('accessToken', action.payload.accessToken);
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.orderRequest = false;
        state.orders = [];
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.refreshToken = '';
        localStorage.removeItem('refreshToken');
        state.accessToken = '';
        deleteCookie('accessToken');
        state.orders = [];
      })

      // Проверка авторизации
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true; // Начинаем проверку
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false; // Завершаем проверку
        state.user = action.payload; // Сохраняем данные пользователя
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false; // Завершаем проверку
        state.user = null; // Очищаем пользователя при ошибке
      });
  }
});

export const getUserOrders = createAsyncThunk(
  'user/getOrders',
  async () => await getOrdersApi()
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

// Thunk для проверки авторизации
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi(); // Запрашиваем данные пользователя
      return response.user; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue(error); // Обрабатываем ошибку
    }
  }
);

export default userSlice.reducer;
