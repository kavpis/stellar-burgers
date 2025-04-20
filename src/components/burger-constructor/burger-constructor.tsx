import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  clearOrderConstructor,
  getNewOrderData,
  orderBurger
} from '../../services/reducers/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => state.newOrderReducer
  );
  const newOrderData = useSelector((state) =>
    getNewOrderData({ newOrder: state.newOrderReducer })
  );
  const { user, isLoading } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = () => {
    if (!user && !isLoading) {
      navigate('/login', {
        state: { locationState: { background: location } }
      });
      return;
    }
    if (constructorItems.bun && !orderRequest) {
      dispatch(orderBurger(newOrderData));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrderConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
