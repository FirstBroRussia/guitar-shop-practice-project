import { ConstantValueEnum } from '../common/enum/constant-value.enum';
import { asyncCheckTokenAction } from '../store/async-action/async-action';
import { store } from '../store/store';


export function useCheckAuthToken() {
  const accessTokenInSessionStorage = sessionStorage.getItem(ConstantValueEnum.ACCESS_TOKEN);

  if (!accessTokenInSessionStorage) {
    return;
  }

  store.dispatch(asyncCheckTokenAction());
}
