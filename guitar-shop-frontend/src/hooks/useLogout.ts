import { ConstantValueEnum } from '../common/enum/constant-value.enum';
import { RoutePathEnum } from '../common/enum/route-path.enum';
import { setNextRouteNavigateAction } from '../store/slice/data.slice';
import { setEmailAction, setIsAdminAction, setIsAuthorizationAction, setUsernameAction } from '../store/slice/user.slice';
import { useAppDispatch } from '../store/store';


export function useLogout() {
  const dispatch = useAppDispatch();

  sessionStorage.removeItem(ConstantValueEnum.ACCESS_TOKEN);
  sessionStorage.setItem(ConstantValueEnum.IS_AUTH_USER, '');
  sessionStorage.setItem(ConstantValueEnum.IS_ADMIN_USER, '');

  dispatch(setIsAuthorizationAction(false));
  dispatch(setEmailAction(null));
  dispatch(setUsernameAction(null));
  dispatch(setIsAdminAction(false));

  dispatch(setNextRouteNavigateAction(RoutePathEnum.Main));
}
