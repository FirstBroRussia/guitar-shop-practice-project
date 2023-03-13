import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { useAppSelector } from '../../store/store';


type AdminPrivateRoutePropsType = {
  children: PropsWithChildren<JSX.Element>;
};


export default function AdminPrivateRoute({ children }: AdminPrivateRoutePropsType) {
  const isAuth = useAppSelector((state) => state[SliceEnum.UserSlice].isAuthorization);
  const isAdmin = useAppSelector((state) => state[SliceEnum.UserSlice].isAdmin);

  return isAuth && isAdmin ? children : <Navigate to={RoutePathEnum.Login} />;
}
