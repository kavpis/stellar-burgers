import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { fetchFeed } from '../../services/reducers/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector((state) => state.feedReducer);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
      )}
    </>
  );
};
