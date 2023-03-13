/* eslint-disable jsx-a11y/anchor-is-valid */

type PaginationItemPropsType = {
  orderNumber: number;
  isActive?: boolean;
  onClickHandler: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function PaginationItem({ orderNumber, isActive, onClickHandler }: PaginationItemPropsType) {

  return (
    <li className={`pagination__page pagination__page-item ${isActive ? 'pagination__page--active' : ''}`}>
      <a className="link pagination__page-link" data-ordernumber={orderNumber} onClick={onClickHandler} >{orderNumber}</a>
    </li>
  );
}
