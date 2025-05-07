import { getCookie } from '../../../utils/cookie';
import userReducer, {
  getUserOrders,
  logout,
  register,
  login,
  updateUserData
} from './userSlice';

describe('userSlice test', () => {
  const initState = {
    isLoading: false,
    isError: false,
    refreshToken: '',
    accessToken: '',
    user: null,
    orders: [],
    orderRequest: false,
    isCheckingAuth: true
  };

  test('register asyncThunk', () => {
    // pending
    expect(userReducer(undefined, { type: register.pending.type })).toEqual({
      ...initState,
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
    ).toEqual({ ...initState, ...payload });
    expect(localStorage.getItem('refreshToken')).toBe('fakeRefreshToken');
    expect(getCookie('accessToken')).toBe('fakeAccessToken');

    // rejected
    expect(
      userReducer(undefined, {
        type: register.rejected.type
      })
    ).toEqual({ ...initState, isError: true });
  });
  // register asyncThunk

  test('login asyncThunk', () => {
    // pending
    expect(userReducer(undefined, { type: login.pending.type })).toEqual({
      ...initState,
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
    ).toEqual({ ...initState, ...payload });
    expect(localStorage.getItem('refreshToken')).toBe('fakeRefreshToken');
    expect(getCookie('accessToken')).toBe('fakeAccessToken');

    // rejected
    expect(
      userReducer(undefined, {
        type: login.rejected.type
      })
    ).toEqual({ ...initState, isError: true });
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
    ).toEqual({ ...initState, ...payload });
  });
  // updateUserData asyncThunk

  test('getUserOrders asyncThunk', () => {
    // pending
    expect(
      userReducer(undefined, { type: getUserOrders.pending.type })
    ).toEqual({ ...initState, orderRequest: true });
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
    ).toEqual({ ...initState, orders: orders });

    // rejected
    expect(
      userReducer(undefined, {
        type: getUserOrders.rejected.type
      })
    ).toEqual({ ...initState });
  });
  // getUserOrders asyncThunk

  test('logout asyncThunk', () => {
    // fullfilled
    expect(
      userReducer(undefined, {
        type: logout.fulfilled.type
      })
    ).toEqual({ ...initState });
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(getCookie('accessToken')).toBeUndefined();
  });
  // getUserOrders asyncThunk
});
