import { useEffect } from 'react';
import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { ingredients, isLoading } = useSelector(
    (state) => state.ingredientsReducer
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  const ingredientData = ingredients.find((item) => item._id === id);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : ingredientData ? (
        <IngredientDetailsUI ingredientData={ingredientData} />
      ) : (
        <h3 className='text text_type_main-medium mt-2 mb-4'>
          Такого ингредиента нет
        </h3>
      )}
    </>
  );
};
