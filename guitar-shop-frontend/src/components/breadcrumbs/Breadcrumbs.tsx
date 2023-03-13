/* eslint-disable no-nested-ternary */

import { nanoid } from 'nanoid';
import { PageNameEnum } from '../../common/enum/page-name.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { RoutePathType } from '../../common/type/route-path.type';

import BreadcrumbItem from './Breadcrumb-item';


const breadcrumbsPaths = {
  [`${RoutePathEnum.Main}`]: [
    { name: PageNameEnum.Main, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
  ],
  [`${RoutePathEnum.Catalog}`]: [
    { name: PageNameEnum.Main, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
  ],
  [`${RoutePathEnum.ProductCard}`]: [
    { name: PageNameEnum.Main, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Product, route: null, },
  ],
  [`${RoutePathEnum.AddProductCard}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Products, route: RoutePathEnum.Main, },
    { name: PageNameEnum.NewProduct, route: null, },
  ],
  [`${RoutePathEnum.Cart}`]: [
    { name: PageNameEnum.Main, route: RoutePathEnum.Main, },
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Cart, route: null, },
  ],
  [`${RoutePathEnum.EditProductCard}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Products, route: RoutePathEnum.Main, },
  ],
  [`${RoutePathEnum.OrderList}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Orders, route: RoutePathEnum.OrderList, },
  ],
  [`${RoutePathEnum.Order}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Orders, route: RoutePathEnum.OrderList, },
    { name: PageNameEnum.Order, route: null, },
  ],
  [`${RoutePathEnum.ProductList}`]: [
    { name: PageNameEnum.Catalog, route: RoutePathEnum.Catalog, },
    { name: PageNameEnum.Products, route: null, },
  ],
};

type BreadcrumbsPropsType = {
  currentPath: RoutePathType;
  addBreadcrumbString?: string;
};


export default function Breadcrumbs({ currentPath, addBreadcrumbString }: BreadcrumbsPropsType) {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {
        currentPath === RoutePathEnum.Order ? breadcrumbsPaths[currentPath].map((item, index) => <BreadcrumbItem key={`breadcrumb-item-${nanoid()}`} title={ index === breadcrumbsPaths[currentPath].length - 1 ? `${item.name}${addBreadcrumbString!}` : item.name } to={item.route as RoutePathType} />) :
          currentPath === RoutePathEnum.EditProductCard ? breadcrumbsPaths[currentPath].map((item, index) => <BreadcrumbItem key={`breadcrumb-item-${nanoid()}`} title={ index === breadcrumbsPaths[currentPath].length - 1 ? `${addBreadcrumbString!}` : item.name } to={item.route as RoutePathType} />) :
            breadcrumbsPaths[currentPath].map((item) => <BreadcrumbItem key={`breadcrumb-item-${nanoid()}`} title={item.name} to={item.route as RoutePathType} />)
      }
    </ul>
  );
}
