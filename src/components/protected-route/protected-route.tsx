import { useSelector } from '../../services/store';
import { useLocation, Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({

  onlyUnAuth,
  children

}: ProtectedRouteProps) {

  const location = useLocation();
  const { user } = useSelector((state) => state.userReducer);

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/' state={{ from: location }} />;
  }
  return children;
}
