import { useMutation } from '@tanstack/react-query';
import{isAuth}from '../Apis/authApi';

export const useIsAuth = () => {
  return useMutation({
    mutationFn: isAuth,
  });
}