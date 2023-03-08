import { Link } from 'react-router-dom';

type BreadcrumbItemPropsType = {
  title: string;
  to: string;
};


export default function BreadcrumbItem({ title, to }: BreadcrumbItemPropsType) {
  return (
    <li className="breadcrumbs__item"><Link className="link" to={to}>{title}</Link></li>
  );
}
