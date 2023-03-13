/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import PaginationItem from './Pagination-item';


const PAGINATION_ITEM_CLASS = 'pagination__page-item';
const PAGINATION_ITEM_ACTIVE_CLASS = 'pagination__page--active';

type AbstractParentComponentState = {
  page: number;
};

type PaginationListPropsType = {
  elementCount: number;
  defaultVisibleElement: number;
  parentComponentState: any & AbstractParentComponentState;
  setParentComponentState: Dispatch<SetStateAction<any & AbstractParentComponentState>>;
};

type InitialPaginationListStateType = {
  currentTargetVisibleTriplePaginationPage: number;
};

const initialPaginationListState: InitialPaginationListStateType = {
  currentTargetVisibleTriplePaginationPage: 1,
};


export default function PaginationList({ elementCount, defaultVisibleElement, parentComponentState, setParentComponentState }: PaginationListPropsType) {
  const paginationListRef = useRef<HTMLUListElement | null>(null);

  const [paginationListState, setPaginationListState] = useState(initialPaginationListState);

  const { currentTargetVisibleTriplePaginationPage } = paginationListState;

  const paginationItemsArrForRender = useMemo(() => {
    const arr = Array(
      elementCount <= (ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * currentTargetVisibleTriplePaginationPage * defaultVisibleElement) ?
        Math.ceil((elementCount - (ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * (currentTargetVisibleTriplePaginationPage - 1) * defaultVisibleElement)) / defaultVisibleElement) :
        (ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * currentTargetVisibleTriplePaginationPage) - (ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * (currentTargetVisibleTriplePaginationPage - 1))
    ).fill('');

    return arr;
  },
  [currentTargetVisibleTriplePaginationPage, elementCount]);


  const onPaginationItemClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    for (const item of (paginationListRef.current)!.childNodes) {
      const closestElement = (item as HTMLElement).closest(`.${PAGINATION_ITEM_ACTIVE_CLASS}`);

      if (closestElement) {
        closestElement.classList.remove(PAGINATION_ITEM_ACTIVE_CLASS);

        break;
      }
    }
    (evt.target as HTMLAnchorElement).parentElement!.classList.add(PAGINATION_ITEM_ACTIVE_CLASS);

    const page = +(evt.target as HTMLAnchorElement).getAttribute('data-ordernumber')!;

    setParentComponentState({
      ...parentComponentState,
      page: page,
    });
  }, [parentComponentState, setParentComponentState]);

  const onPaginationPrevButtonClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    setPaginationListState({
      ...paginationListState,
      currentTargetVisibleTriplePaginationPage: paginationListState.currentTargetVisibleTriplePaginationPage - 1,
    });
    setParentComponentState({
      ...parentComponentState,
      page: (ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * (paginationListState.currentTargetVisibleTriplePaginationPage - 1)) - 2,
    });
  }, [paginationListState, setParentComponentState, parentComponentState]);

  const onPaginationNextButtonClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    setPaginationListState({
      ...paginationListState,
      currentTargetVisibleTriplePaginationPage: paginationListState.currentTargetVisibleTriplePaginationPage + 1,
    });
    setParentComponentState({
      ...parentComponentState,
      page: (ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * (paginationListState.currentTargetVisibleTriplePaginationPage + 1)) - 2,
    });
  }, [paginationListState, setParentComponentState, parentComponentState]);


  useEffect(() => () => {
    (paginationListRef.current?.childNodes)?.forEach((item) => (item as HTMLElement).classList.remove(PAGINATION_ITEM_ACTIVE_CLASS));

    if (!paginationListRef.current?.childNodes) {
      return;
    }

    for (const item of paginationListRef.current.childNodes) {
      if ((item as HTMLElement).classList.contains(PAGINATION_ITEM_CLASS)) {
        (item as HTMLElement).classList.add(PAGINATION_ITEM_ACTIVE_CLASS);

        break;
      }
    }
  }, [paginationItemsArrForRender]);

  useEffect(() => {
    setPaginationListState({
      currentTargetVisibleTriplePaginationPage: 1,
    });
  }, [elementCount]);


  return (
    <ul className="pagination__list" ref={paginationListRef} >
      {
        currentTargetVisibleTriplePaginationPage > 1 &&
        (
          <li className="pagination__page pagination__page--prev" id="prev">
            <a className="link pagination__page-link" onClick={onPaginationPrevButtonClickHandler} >Назад</a>
          </li>
        )
      }
      {
        paginationItemsArrForRender.map((_item, index) =>
          <PaginationItem key={`pagination-item-${index + 1}`} orderNumber={(ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * (currentTargetVisibleTriplePaginationPage - 1)) + (index + 1)} isActive={index === 0} onClickHandler={onPaginationItemClickHandler} />)
      }
      {
        elementCount > ConstantValueEnum.DEFAULT_VISIBLE_PAGINATION_PAGE_BUTTON * currentTargetVisibleTriplePaginationPage * defaultVisibleElement &&
          (
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" onClick={onPaginationNextButtonClickHandler} >Далее</a>
            </li>
          )
      }
    </ul>
  );
}
