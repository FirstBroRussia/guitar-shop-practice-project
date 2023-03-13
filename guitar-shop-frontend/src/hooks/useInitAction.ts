import { useMemo, useRef } from 'react';
import { ConstantValueEnum } from '../common/enum/constant-value.enum';
import { setIsAdminAction, setIsAuthorizationAction } from '../store/slice/user.slice';
import { useAppDispatch } from '../store/store';


export function useInitAction() {
  const isInit = useRef(false);
  const dispatch = useAppDispatch();

  useMemo(() => {
    if (isInit.current) {
      return;
    }

    const isAuth = Boolean(sessionStorage.getItem(ConstantValueEnum.IS_AUTH_USER));
    const isAdmin = Boolean(sessionStorage.getItem(ConstantValueEnum.IS_ADMIN_USER));

    dispatch(setIsAuthorizationAction(isAuth));
    dispatch(setIsAdminAction(isAdmin));

    isInit.current = true;
  }, []);
}
