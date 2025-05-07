import '../../index.css';
import styles from './app.module.css';
import {
  ConstructorPage,
  Register,
  Login,
  NotFound404,
  Feed,
  ForgotPassword,
  ProfileOrders,
  Profile,
  ResetPassword
} from '@pages';
import { Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import { Modal, AppHeader, IngredientDetails, OrderInfo } from '@components';
import InfoAboutFeed from '../info-about-order/info-about-order';
import ProtectedRoute from '../protected-route/protected-route';
import InfoAboutIngredient from '../info-about-ingredient/info-about-ingredient';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkAuth } from '../../services/reducers/userSlice/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Outlet />
          </div>
        }
      >
        <Route index element={<ConstructorPage />} />
        <Route
          path='feed'
          element={
            <>
              <Feed />
            </>
          }
        />
        <Route
          path='feed/:number'
          element={
            <InfoAboutFeed onClose={() => navigate('/feed')}>
              <OrderInfo />
            </InfoAboutFeed>
          }
        />
        <Route
          path='ingredients/:id'
          element={
            <InfoAboutIngredient onClose={() => navigate('/')}>
              <IngredientDetails />
            </InfoAboutIngredient>
          }
        />
        <Route
          path='login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route
            path='orders'
            element={
              <>
                <ProfileOrders />
                <Outlet />
              </>
            }
          >
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <Modal title='' onClose={() => navigate('profile/orders')}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>
  );
};

export default App;
