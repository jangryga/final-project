import { useRequest } from '../../utils/hooks/useRequest';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoggedOut } from '../../state/actions/authActions';
import LoadingScreen from '../ui/LoadingScreen';

export default function SignOut() {
  const dispatch = useDispatch();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      dispatch(setUserLoggedOut());

      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    },
  });

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return <LoadingScreen />;
}
