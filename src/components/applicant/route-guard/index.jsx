import { LOGIN_TYPE } from '@/constant';
import { authAtom } from '@/store';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

export const RouteGuard = ({ children }) => {
  const authInfo = useRecoilValue(authAtom);
  const location = useLocation();
  const { isLogined, loginType } = authInfo;

  if (!isLogined) {
    if (loginType === LOGIN_TYPE.USER) {
      return children;
    } else if (loginType === LOGIN_TYPE.AGENT) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  } else {
    if (loginType === LOGIN_TYPE.USER) {
      return <Navigate to="/top" state={{ from: location }} replace />;
    } else if (LOGIN_TYPE.AGENT) {
      return <Navigate to="/agreement" state={{ from: location }} replace />;
    }
  }
};

RouteGuard.propTypes = {
  children: PropTypes.node,
};
