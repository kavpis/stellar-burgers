import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUserData, checkAuth } from '../../services/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, isCheckingAuth } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [initialFormValue, setInitialFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      navigate('/login');
    }
  }, [isCheckingAuth, user, navigate]);

  useEffect(() => {
    if (user && !isInitialized) {
      const initialValues = {
        name: user.name,
        email: user.email,
        password: ''
      };
      setFormValue(initialValues);
      setInitialFormValue(initialValues);
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const isFormChanged = isInitialized
    ? formValue.name !== initialFormValue.name ||
      formValue.email !== initialFormValue.email ||
      !!formValue.password
    : false;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUserData({ ...formValue }));
      setInitialFormValue({
        name: formValue.name,
        email: formValue.email,
        password: ''
      });
      setFormValue((prev) => ({
        ...prev,
        password: ''
      }));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        ...initialFormValue,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {user && (
        <ProfileUI
          formValue={formValue}
          isFormChanged={isFormChanged}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};
