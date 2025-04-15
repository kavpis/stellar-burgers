import styles from './info-about-order.module.css';
import { Feed } from '@pages';
import { Modal } from '../modal';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type InfoAboutOrderProps = {
  onClose?: () => void;
  children: React.ReactNode;
};

export default function InfoAboutOrder({
  onClose,
  children
}: InfoAboutOrderProps) {
  const { state } = useLocation();
  const { number } = useParams();

  return state?.background ? (
    <>
      <Feed />
      <Modal title={`#${number}`} onClose={onClose!}>
        {children}
      </Modal>
    </>
  ) : (
    <div className={styles.info_container}>
      <h3 className={`${styles.info_header} text text_type_main-large`}>
        {`#${number}`}
      </h3>
      {children}
    </div>
  );
}
