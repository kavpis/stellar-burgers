import newOrderReducer, {
  addIngredient,
  getNewOrderData,
  moveIngredient,
  deleteIngredient,
  orderBurger,
  initialState
} from './orderSlice';

describe('orderSlice test', () => {
  test('orderBurger asyncThunk', () => {
    // pending
    expect(
      newOrderReducer(undefined, { type: orderBurger.pending.type })
    ).toEqual({ ...initialState, isLoading: true, orderRequest: true });

    // fullfilled
    const payload = {
      order: {
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
    };
    expect(
      newOrderReducer(undefined, {
        type: orderBurger.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initialState, orderModalData: payload.order });

    // rejected
    expect(
      newOrderReducer(undefined, {
        type: orderBurger.rejected.type
      })
    ).toEqual({ ...initialState, isError: true });
  });
  // orderBurger asyncThunk

  test('moveIngredient', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      }
    ];

    const state = {
      ...initialState,
      constructorItems: { ...initialState.constructorItems, ingredients }
    };

    // перемещение вниз
    const result = newOrderReducer(
      state,
      moveIngredient({ index: 0, offset: 1 })
    );
    expect(result.constructorItems.ingredients).toHaveLength(2);
    expect(result.constructorItems.ingredients[0]._id).toBe(ingredients[1]._id);
    expect(result.constructorItems.ingredients[1]._id).toBe(ingredients[0]._id);

    // перемещение вверх
    const result2 = newOrderReducer(
      state,
      moveIngredient({ index: 1, offset: -1 })
    );
    expect(result2.constructorItems.ingredients).toHaveLength(2);
    expect(result2.constructorItems.ingredients[0]._id).toBe(
      ingredients[1]._id
    );
    expect(result2.constructorItems.ingredients[1]._id).toBe(
      ingredients[0]._id
    );

    // некорректный индекс (ниже 0)
    const result3 = newOrderReducer(
      state,
      moveIngredient({ index: -1, offset: 1 })
    );
    expect(result3.constructorItems.ingredients).toEqual(ingredients);

    // некорректный индекс (выше длины массива)
    const result4 = newOrderReducer(
      state,
      moveIngredient({ index: 2, offset: 1 })
    );
    expect(result4.constructorItems.ingredients).toEqual(ingredients);
  });

  test('addIngredient', () => {
    // булка
    const bun = {
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
    };
    expect(newOrderReducer(undefined, addIngredient(bun))).toEqual({
      ...initialState,
      constructorItems: {
        bun: { ...bun, id: expect.any(String) },
        ingredients: []
      }
    });

    // не булка
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    expect(newOrderReducer(undefined, addIngredient(ingredient))).toEqual({
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [{ ...ingredient, id: expect.any(String) }]
      }
    });
  });
  // addIngredient

  test('getNewOrderData', () => {
    const fakeConstructorItems = {
      bun: {
        _id: '643d69a5c3f7b9001cfa093c',
        id: 'fakeId',
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
      },
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ]
    };

    // результат с булкой
    expect(
      getNewOrderData({
        newOrder: { ...initialState, constructorItems: fakeConstructorItems }
      })
    ).toEqual([
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ]);

    // результат без
    expect(
      getNewOrderData({
        newOrder: {
          ...initialState,
          constructorItems: {
            bun: null,
            ingredients: fakeConstructorItems.ingredients
          }
        }
      })
    ).toEqual([]);
  });

  test('deleteIngredient', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];

    // удаление существующего ингредиента
    expect(
      newOrderReducer(
        {
          ...initialState,
          constructorItems: { ...initialState.constructorItems, ingredients }
        },
        deleteIngredient(0)
      )
    ).toEqual({
      ...initialState,
      constructorItems: { ...initialState.constructorItems, ingredients: [] }
    });

    // удаление несуществующего ингредиента
    expect(
      newOrderReducer(
        {
          ...initialState,
          constructorItems: { ...initialState.constructorItems, ingredients }
        },
        deleteIngredient(-1)
      )
    ).toEqual({
      ...initialState,
      constructorItems: { ...initialState.constructorItems, ingredients }
    });
  });
  // deleteIngredient
});
