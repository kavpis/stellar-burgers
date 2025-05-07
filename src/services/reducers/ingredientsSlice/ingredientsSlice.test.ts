import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice test', () => {
  const initState = {
    isLoading: false,
    isError: false,
    ingredients: []
  };

  test('fetchIngredients asyncThunk', () => {
    // pending
    expect(
      ingredientsReducer(undefined, { type: fetchIngredients.pending.type })
    ).toEqual({ ...initState, isLoading: true });

    // fullfilled
    const payload = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];

    expect(
      ingredientsReducer(undefined, {
        type: fetchIngredients.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initState, ingredients: payload });
    // rejected
    expect(
      ingredientsReducer(undefined, {
        type: fetchIngredients.rejected.type
      })
    ).toEqual({ ...initState, isError: true });
  });
});
