import { useCallback, useMemo, useState } from 'react';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { CreateOrderType } from '../../common/type/create-order.type';
import { OrderProductsListType } from '../../common/type/order-product-list.type';
import { asyncPostNewOrderAction } from '../../store/async-action/async-action';
import { ProductCartType } from '../../store/slice/cart.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CartItem from './cart-item/Cart-item';


export default function Cart() {
  const dispatch = useAppDispatch();

  const [cartList, setCartList] = useState<ProductCartType[] | null>(null);
  const [sumPrice, setSumPrice] = useState<number>(0);

  const productCartMapList = useAppSelector((state) => state[SliceEnum.CartSlice].productCartList);

  useMemo(() => {
    const arr = Object.values(Object.fromEntries(productCartMapList));

    let sum = 0;

    arr.forEach((item) => {
      sum += item.productData.price * item.count;
    });

    setCartList(arr);
    setSumPrice(sum);
  }, [productCartMapList]);

  const onSubmitBuyButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    let totalCount = 0;
    let totalPrice = 0;

    const orderProductList = cartList?.map((item) => {
      const data = {
        productId: item.productData.id,
        price: item.productData.price,
        count: item.count,
        totalPrice: item.productData.price * item.count,
      };

      totalCount += data.count;
      totalPrice += data.totalPrice;

      return data;
    }) as OrderProductsListType[];

    const dto: CreateOrderType = {
      products: orderProductList,
      totalCount: totalCount,
      totalPrice: totalPrice,
    };

    dispatch(asyncPostNewOrderAction(dto));
  }, [cartList, sumPrice]);


  return (
    <div className="container">
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <Breadcrumbs currentPath={RoutePathEnum.Cart} />
      <div className="cart">
        {
          cartList && cartList.length > ConstantValueEnum.ZERO_VALUE ? cartList.map((item) => <CartItem key={item.productData.id} productData={item.productData} count={item.count} />) :
            <h2 className="title">Нет продуктов в корзине</h2>
        }
        {
          cartList && cartList.length > ConstantValueEnum.ZERO_VALUE ?
            (
              <div className="cart__footer">
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{sumPrice} ₽</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{sumPrice} ₽</span></p>
                  <button className="button button--red button--big cart__order-button" onClick={onSubmitBuyButtonClickHandler} >Оформить заказ</button>
                </div>
              </div>
            ) : null
        }
      </div>
    </div>
  );
}
