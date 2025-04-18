import { useLocation } from 'react-router-dom';
import { ConstructorPage } from '@pages';
import styles from './info-about-ingredient.module.css';

import { Modal } from '../modal';

type InfoAboutIngredientProps = {
  onClose?: () => void;
  children: React.ReactNode;
};

export default function InfoAboutIngredient({
  onClose,
  children
}: InfoAboutIngredientProps) {
  const { state } = useLocation();

  return state?.background ? (
    <>
      <ConstructorPage />
      <Modal title='Детали ингредиента' onClose={onClose!}>
        {children}
      </Modal>
    </>
  ) : (
    <div className={styles.info_container}>{children}</div>
  );
}
