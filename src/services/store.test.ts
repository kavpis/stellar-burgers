import { rootReducer } from './store';
import ingredientsReducer from './reducers/ingredientsSlice/ingredientsSlice';
import newOrderReducer from './reducers/orderSlice/orderSlice';
import feedReducer from './reducers/feedSlice/feedSlice';
import userReducer from './reducers/userSlice/userSlice';

describe('store test', () => {
  test('rootReducer initialValue', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual({
      ingredientsReducer: ingredientsReducer(undefined, { type: 'unknown' }),
      newOrderReducer: newOrderReducer(undefined, { type: 'unknown' }),
      feedReducer: feedReducer(undefined, { type: 'unknown' }),
      userReducer: userReducer(undefined, { type: 'unknown' })
    });
  });
});
