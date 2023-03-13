import { Link } from 'react-router-dom';
import { RoutePathType } from '../../common/type/route-path.type';

type BreadcrumbItemPropsType = {
  title: string;
  to: RoutePathType;
};


export default function BreadcrumbItem({ title, to }: BreadcrumbItemPropsType) {
  return (
    <li className="breadcrumbs__item">
      <Link className="link" to={to} >{title}</Link>
    </li>
  );
}
