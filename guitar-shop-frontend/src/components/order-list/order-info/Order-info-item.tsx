import { ConstantValueEnum } from '../../../common/enum/constant-value.enum';
import { getGuitarTypeString } from '../../../common/helper/helper';
import { OrderProductsListWithProductDataType } from '../../../common/type/order-product-list-with-product-data.type';


type OrderInfoItemPropsType = {
  order: OrderProductsListWithProductDataType;
};


export default function OrderInfoItem({ order }: OrderInfoItemPropsType) {
  const { product, count, totalPrice } = order;
  const { title, article, guitarType, guitarStringsCount, imageLink } = product;


  return (
    <li className="order-list__item">
      <div className="order-list__data">
        <img src={`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink}`} srcSet={`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink.replace('.png', '')}@2x.png 2x`} width={60} height={130} alt={title} />
        <div className="order-list__container">
          <p className="order-list__name">{title}</p>
          <p className="order-list__lot">Артикул: {article}</p>
          <p className="order-list__parameters">{getGuitarTypeString(guitarType)}, {guitarStringsCount} струнная</p>
        </div>
      </div><span className="order-list__quantity">{count}</span><span className="order-list__price">{totalPrice} ₽</span>
    </li>
  );
}
