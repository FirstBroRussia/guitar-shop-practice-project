import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransformDateForOrderComponents } from '../../../common/helper/helper';
import { OrderDataType } from '../../../common/type/order-data.type';
import { asyncDeleteOrderByOrderIdAction } from '../../../store/async-action/async-action';
import { useAppDispatch } from '../../../store/store';


type OrderItemPropsType = {
  orderData: OrderDataType;
};


export default function OrderItem({ orderData }: OrderItemPropsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id, totalCount, totalPrice, createdAt } = orderData;

  const onDeleteOrderButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    dispatch(asyncDeleteOrderByOrderIdAction(id));
  }, [id]);


  const onOrderItemClickHandler: React.MouseEventHandler<HTMLLIElement> = useCallback((evt) => {
    evt.preventDefault();

    if ((evt.target as HTMLElement).classList.contains('button')) {
      return;
    }

    navigate(`/order/${id}`);
  }, [id]);


  return (
    <li className="orders__item" onClick={onOrderItemClickHandler} >
      <h3 className="orders__number">Заказ №{id.substring(10)}</h3>
      <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">{totalCount}</b></span>
      <span className="orders__date">{getTransformDateForOrderComponents(createdAt)}</span><b className="orders__sum">{totalPrice}<span className="orders__rouble">₽</span></b>
      <button className="button button--small orders__remove-button" type="button" onClick={onDeleteOrderButtonClickHandler} >Удалить</button>
    </li>
  );
}
