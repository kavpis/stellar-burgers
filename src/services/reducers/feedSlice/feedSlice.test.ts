import feedReducer, { fetchFeed } from './feedSlice';

describe('feedSlice test', () => {
  const initState = {
    isLoading: false,
    isError: false,
    feed: {
      total: 0,
      totalToday: 0
    },
    orders: []
  };

  test('fetchFeed asyncThunk', () => {
    // pending
    expect(feedReducer(undefined, { type: fetchFeed.pending.type })).toEqual({
      ...initState,
      isLoading: true
    });
    // fullfilled
    const payload = {
      total: 123,
      totalToday: 456,
      orders: [
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
      ]
    };
    expect(
      feedReducer(undefined, {
        type: fetchFeed.fulfilled.type,
        payload: payload
      })
    ).toEqual({
      ...initState,
      feed: { total: payload.total, totalToday: payload.totalToday },
      orders: payload.orders
    });

    // rejected
    expect(
      feedReducer(undefined, {
        type: fetchFeed.rejected.type
      })
    ).toEqual({ ...initState, isError: true });
  });
});
