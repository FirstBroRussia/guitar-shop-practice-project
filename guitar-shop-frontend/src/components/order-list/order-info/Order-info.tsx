/* eslint-disable @typescript-eslint/no-non-null-assertion */
// getTransformDateForOrderComponents

import { nanoid } from 'nanoid';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePathEnum } from '../../../common/enum/route-path.enum';
import { SliceEnum } from '../../../common/enum/slice.enum';
import { getTransformDateForOrderComponents } from '../../../common/helper/helper';
import { asyncGetOrderByOrderIdAction } from '../../../store/async-action/async-action';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Breadcrumbs from '../../breadcrumbs/Breadcrumbs';
import OrderInfoItem from './Order-info-item';


export default function OrderInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { orderId } = useParams();

  useEffect(() => {
    dispatch(asyncGetOrderByOrderIdAction(orderId!));
  }, []);

  const onOrderListRouteButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    navigate(RoutePathEnum.OrderList);
  }, []);

  const orderData = useAppSelector((state) => state[SliceEnum.OrderSlice].orderData);

  if (!orderData) {
    return null;
  }

  const { id, createdAt, products, totalPrice, totalCount } = orderData;


  return (
    <section className="order">
      <div className="container">
        <h1 className="order__title">Заказ № {id.substring(10)}</h1>
        <Breadcrumbs currentPath={RoutePathEnum.Order} addBreadcrumbString={id.substring(10)} />
        <table className="order-table">
          <tbody>
            <tr>
              <td>Общее количество товаров</td>
              <td>{totalCount}</td>
            </tr>
            <tr>
              <td>Дата заказа</td>
              <td>{getTransformDateForOrderComponents(createdAt)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>К оплате</td>
              <td>{totalPrice} <span>₽</span></td>
            </tr>
          </tfoot>
        </table>
        <ul className="order__list order-list">
          {
            products.map((item) => <OrderInfoItem key={nanoid()} order={item} />)
          }
        </ul>
        <button className="button order__button button--small button--black-border" onClick={onOrderListRouteButtonClickHandler} >Вернуться к списку заказов</button>
      </div>
    </section>
  );
}
