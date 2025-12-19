import useAsync from '../useAsync';

import * as forgotPasswordApi from '../../services/forgotPassword';

export default function useForgotPassword() {
  const {
    loading: forgotPasswordLoading,
    error: forgotPasswordError,
    act: forgotPassword,
  } = useAsync((data) => forgotPasswordApi.forgotPassword(data), false);

  return {
    forgotPasswordLoading,
    forgotPasswordError,
    forgotPassword,
  };
}
