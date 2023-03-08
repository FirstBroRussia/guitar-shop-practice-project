import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { RoutePathType } from '../../common/type/route-path.type';
import { useAppSelector } from '../../store/store';
import BreadcrumbItem from './Breadcrumb-item';

export const PageNameEnum = {
  Main: 'Главная',
  Catalog: 'Каталог',
  Cart: 'Корзина',
  NewProduct: 'Новый товар',
  Product: 'Товар',
  Products: 'Товары',
  Orders: 'Заказы',
} as const;

const breadcrumbsPaths = {
  [`${RoutePathEnum.Main}`]: [
    { name: PageNameEnum.Main, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Main, },
  ],
  [`${RoutePathEnum.AddProductCard}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Products, route: RoutePathEnum.Main, },
    { name: PageNameEnum.NewProduct, route: null, },
  ],
  [`${RoutePathEnum.Cart}`]: [
    { name: PageNameEnum.Main, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Cart, route: null, },
  ],
  [`${RoutePathEnum.EditProductCard}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Products, route: RoutePathEnum.Main, },
  ],
};

type BreadcrumbsPropsType = {
  currentPath?: RoutePathType;
  extraBreadcrumb?: string;
};

export default function Breadcrumbs({ currentPath, extraBreadcrumb }: BreadcrumbsPropsType) {
  const location = useLocation();

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {
        breadcrumbsPaths[location.pathname].map((item, index) => <BreadcrumbItem key={`breadcrumb-${index + 1}`} title={item.name} to={location.pathname} />)
      }
    </ul>
  );
}
