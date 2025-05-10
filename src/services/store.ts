import ingredientsReducer from './reducers/ingredientsSlice/ingredientsSlice';
import newOrderReducer from './reducers/orderSlice/orderSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import feedReducer from './reducers/feedSlice/feedSlice';
import userReducer from './reducers/userSlice/userSlice';

export const rootReducer = combineReducers({
  ingredientsReducer,
  newOrderReducer,
  feedReducer,
  userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
