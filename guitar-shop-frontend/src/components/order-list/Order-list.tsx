import { useEffect, useState } from 'react';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { OrderStateSortEnum } from '../../common/enum/order-state-sort.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { OrderStateType } from '../../common/type/order-state.type';
import { asyncGetOrdersListAction } from '../../store/async-action/async-action';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import PaginationList from '../pagination/Pagination-list';
import OrderItem from './order-item/Order-item';
import OrderSort from './order-sort/Order-sort';


const initialCatalogStateValues: OrderStateType = {
  page: 1,
  sort: OrderStateSortEnum.PriceDesc,
};


export default function OrderList() {
  const dispatch = useAppDispatch();

  const [orderState, setOrderState] = useState<OrderStateType>(initialCatalogStateValues);

  const orderList = useAppSelector((state) => state[SliceEnum.OrderSlice].orderList);
  const orderCount = useAppSelector((state) => state[SliceEnum.OrderSlice].orderCount);


  useEffect(() => {
    dispatch(asyncGetOrdersListAction(orderState));
  }, [orderState]);

  if (!orderList) {
    return null;
  }


  return (
    <section className="orders">
      <div className="container">
        <h1 className="title title--bigger orders__title">Список заказов</h1>
        <Breadcrumbs currentPath={RoutePathEnum.OrderList} />
        <OrderSort orderComponentState={orderState} setOrderComponentState={setOrderState} />
        <ul className="orders__list">
          {
            orderList && orderList.length > ConstantValueEnum.ZERO_VALUE ? orderList.map((item) => <OrderItem key={item.id} orderData={item} /> ) : <h2 className="title orders__title">Нет заказов</h2>
          }
        </ul>
        <div className="pagination orders__pagination">
          <PaginationList elementCount={orderCount} defaultVisibleElement={ConstantValueEnum.DEFAULT_ORDERS_LIMIT} parentComponentState={orderState} setParentComponentState={setOrderState} />
        </div>
      </div>
    </section>
  );
}
