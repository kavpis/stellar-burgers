import { useDispatch } from '../../services/store';
import { login } from '../../services/reducers/userSlice/userSlice';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));

    navigate(
      state?.locationState?.background?.pathname
        ? state.locationState.background.pathname
        : '/'
    );
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
