import { getCookie } from '../../../utils/cookie';
import userReducer, {
  getUserOrders,
  logout,
  register,
  login,
  updateUserData,
  initialState
} from './userSlice';

describe('userSlice test', () => {
  test('register asyncThunk', () => {
    // pending
    expect(userReducer(undefined, { type: register.pending.type })).toEqual({
      ...initialState,
      isLoading: true
    });
    // fullfilled
    const payload = {
      refreshToken: 'fakeRefreshToken',
      accessToken: 'fakeAccessToken',
      user: {
        email: '12345@email.com',
        name: 'user'
      }
    };
    expect(
      userReducer(undefined, {
        type: register.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initialState, ...payload });
    expect(localStorage.getItem('refreshToken')).toBe('fakeRefreshToken');
    expect(getCookie('accessToken')).toBe('fakeAccessToken');

    // rejected
    expect(
      userReducer(undefined, {
        type: register.rejected.type
      })
    ).toEqual({ ...initialState, isError: true });
  });
  // register asyncThunk

  test('login asyncThunk', () => {
    // pending
    expect(userReducer(undefined, { type: login.pending.type })).toEqual({
      ...initialState,
      isLoading: true
    });
    // fullfilled
    const payload = {
      refreshToken: 'fakeRefreshToken',
      accessToken: 'fakeAccessToken',
      user: {
        email: '12345@email.com',
        name: 'user'
      }
    };
    expect(
      userReducer(undefined, {
        type: login.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initialState, ...payload });
    expect(localStorage.getItem('refreshToken')).toBe('fakeRefreshToken');
    expect(getCookie('accessToken')).toBe('fakeAccessToken');

    // rejected
    expect(
      userReducer(undefined, {
        type: login.rejected.type
      })
    ).toEqual({ ...initialState, isError: true });
  });
  // login asyncThunk

  test('updateUserData asyncThunk', () => {
    // fullfilled
    const payload = {
      user: {
        email: '12345@email.com',
        name: 'user'
      }
    };
    expect(
      userReducer(undefined, {
        type: updateUserData.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initialState, ...payload });
  });
  // updateUserData asyncThunk

  test('getUserOrders asyncThunk', () => {
    // pending
    expect(
      userReducer(undefined, { type: getUserOrders.pending.type })
    ).toEqual({ ...initialState, orderRequest: true });
    // fullfilled
    const orders = [
      {
        _id: 123,
        status: 'Выполнен',
        name: 'Краторный био-марсианский бургер',
        createdAt: '',
        updatedAt: '',
        number: 12345,
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ]
      }
    ];
    expect(
      userReducer(undefined, {
        type: getUserOrders.fulfilled.type,
        payload: orders
      })
    ).toEqual({ ...initialState, orders: orders });

    // rejected
    expect(
      userReducer(undefined, {
        type: getUserOrders.rejected.type
      })
    ).toEqual({ ...initialState });
  });
  // getUserOrders asyncThunk

  test('logout asyncThunk', () => {
    // fullfilled
    expect(
      userReducer(undefined, {
        type: logout.fulfilled.type
      })
    ).toEqual({ ...initialState });
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(getCookie('accessToken')).toBeUndefined();
  });
  // getUserOrders asyncThunk
});
