/* eslint-disable no-console */

import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalNameEnum } from '../../common/enum/modal-name.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { useAppSelector } from '../../store/store';
import AddCartModal from '../modal/Add-cart-modal';
import AddReviewModal from '../modal/Add-review-modal';
import DeleteCartModal from '../modal/Delete-cart-modal';
import EnterModal from '../modal/Enter-modal';
import SuccessCartModal from '../modal/Success-cart-modal';
import SuccessOrderModal from '../modal/Success-order-modal';

type MainPropsType = {
  children: PropsWithChildren<JSX.Element>;
};

export default function Main({ children }: MainPropsType) {
  const location = useLocation();

  const openModal = useAppSelector((state) => state[SliceEnum.ModalSlice].openModal);


  return (
    <main className={`page-content ${ location.pathname === RoutePathEnum.OrderList ? 'orders__main' : '' }`}>
      {children}
      { openModal === ModalNameEnum.EnterModal && <EnterModal /> }
      { openModal === ModalNameEnum.AddCartModal && <AddCartModal /> }
      { openModal === ModalNameEnum.SuccessCartModal && <SuccessCartModal /> }
      { openModal === ModalNameEnum.AddReviewModal && <AddReviewModal /> }
      { openModal === ModalNameEnum.DeleteCartModal && <DeleteCartModal /> }
      { openModal === ModalNameEnum.SuccessOrderModal && <SuccessOrderModal /> }
    </main>
  );
}
