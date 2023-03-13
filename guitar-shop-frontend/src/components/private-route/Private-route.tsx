import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { useAppSelector } from '../../store/store';


type PrivateRoutePropsType = {
  children: PropsWithChildren<JSX.Element>;
};


export default function PrivateRoute({ children }: PrivateRoutePropsType) {
  const isAuth = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);

  return isAuth ? children : <Navigate to={RoutePathEnum.Login} />;
}
