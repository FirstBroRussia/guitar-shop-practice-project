/* eslint-disable no-nested-ternary */
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useCallback, useRef } from 'react';
import { GuitarStringsEnum } from '../../common/enum/guitar-strings.enum';
import { GuitarEnum } from '../../common/enum/guitar.enum';
import { CatalogFilterValueType } from '../../common/type/catalog-filter.type';
import { GuitarStringsType } from '../../common/type/guitar-strings.type';
import { GuitarType } from '../../common/type/guitar.type';

type CatalogFilterPropsType = {
  catalogFilterState: CatalogFilterValueType;
  setCatalogFilterState: Dispatch<SetStateAction<CatalogFilterValueType>>;
};


export default function CatalogFilter({ catalogFilterState, setCatalogFilterState }: CatalogFilterPropsType) {
  const initialCatalogFilterState = useRef(catalogFilterState);

  const { minPricePlaceholder, maxPricePlaceholder, guitarTypeArr, guitarStringsArr } = catalogFilterState;


  const onMinPriceChangeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;

    const currentCatalogFilterValue: CatalogFilterValueType = {
      ...catalogFilterState,
      minPriceValue: value,
    };

    setCatalogFilterState(currentCatalogFilterValue);
  }, [catalogFilterState, setCatalogFilterState]);

  const onMaxPriceChangeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;

    const currentCatalogFilterValue: CatalogFilterValueType = {
      ...catalogFilterState,
      maxPriceValue: value,
    };

    setCatalogFilterState(currentCatalogFilterValue);
  }, [catalogFilterState, setCatalogFilterState]);

  const onGuitarTypeCheckboxChangeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const targetElementName = evt.target.name as unknown as GuitarType;
    const targetElementChecked = evt.target.checked;

    const currentCatalogFilterValue: CatalogFilterValueType = {
      ...catalogFilterState,
    };

    if (targetElementChecked) {
      currentCatalogFilterValue.guitarTypeArr.push(targetElementName);
    } else {
      currentCatalogFilterValue.guitarTypeArr = currentCatalogFilterValue.guitarTypeArr.filter((item) => !(item === targetElementName));
    }

    setCatalogFilterState(currentCatalogFilterValue);
  }, [catalogFilterState, setCatalogFilterState]);

  const onGuitarStringsCheckboxChangeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const targetElementGuitarStringsCountValue = +evt.target.name.substring(0, evt.target.name.indexOf('-')) as GuitarStringsType;
    const targetElementChecked = evt.target.checked;


    const currentCatalogFilterValue: CatalogFilterValueType = {
      ...catalogFilterState,
    };

    if (targetElementChecked) {
      currentCatalogFilterValue.guitarStringsArr.push(targetElementGuitarStringsCountValue);
    } else {
      currentCatalogFilterValue.guitarStringsArr = currentCatalogFilterValue.guitarStringsArr.filter((item) => !(item === targetElementGuitarStringsCountValue));
    }

    setCatalogFilterState(currentCatalogFilterValue);
  }, [catalogFilterState, setCatalogFilterState]);


  const onDefaultFilterStateButtonClickHandler = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    setCatalogFilterState(initialCatalogFilterState.current);
  }, [setCatalogFilterState]);


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={`${minPricePlaceholder}`} id="priceMin" name="от" onChange={onMinPriceChangeHandler} min={minPricePlaceholder} max={maxPricePlaceholder} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={`${maxPricePlaceholder}`} id="priceMax" name="до" onChange={onMaxPriceChangeHandler} min={minPricePlaceholder} max={maxPricePlaceholder} />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => item === GuitarEnum.Acoustic) ?
              <input className="visually-hidden" type="checkbox" id="Acoustic" name="Acoustic" onChange={onGuitarTypeCheckboxChangeHandler} checked /> :
              <input className="visually-hidden" type="checkbox" id="Acoustic" name="Acoustic" onChange={onGuitarTypeCheckboxChangeHandler} />
          }
          <label htmlFor="Acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => item === GuitarEnum.Electro) ?
              <input className="visually-hidden" type="checkbox" id="Electro" name="Electro" onChange={onGuitarTypeCheckboxChangeHandler} checked /> :
              <input className="visually-hidden" type="checkbox" id="Electro" name="Electro" onChange={onGuitarTypeCheckboxChangeHandler} />
          }
          <label htmlFor="Electro">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => item === GuitarEnum.Ukulele) ?
              <input className="visually-hidden" type="checkbox" id="Ukulele" name="Ukulele" onChange={onGuitarTypeCheckboxChangeHandler} checked /> :
              <input className="visually-hidden" type="checkbox" id="Ukulele" name="Ukulele" onChange={onGuitarTypeCheckboxChangeHandler} />
          }
          <label htmlFor="Ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => (item === GuitarEnum.Ukulele || item === GuitarEnum.Electro)) ?
              guitarStringsArr.includes(GuitarStringsEnum.Four) ?
                <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" onChange={onGuitarStringsCheckboxChangeHandler} checked /> :
                <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" onChange={onGuitarStringsCheckboxChangeHandler} /> :
              <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" disabled />
          }
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => (item === GuitarEnum.Acoustic || item === GuitarEnum.Electro)) ?
              guitarStringsArr.includes(GuitarStringsEnum.Six) ?
                <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" onChange={onGuitarStringsCheckboxChangeHandler} checked /> :
                <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" onChange={onGuitarStringsCheckboxChangeHandler} /> :
              <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" disabled />
          }
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => (item === GuitarEnum.Acoustic || item === GuitarEnum.Electro)) ?
              guitarStringsArr.includes(GuitarStringsEnum.Seven) ?
                <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" onChange={onGuitarStringsCheckboxChangeHandler} checked /> :
                <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" onChange={onGuitarStringsCheckboxChangeHandler} /> :
              <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" disabled />
          }
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          {
            guitarTypeArr.some((item) => item === GuitarEnum.Acoustic) ?
              guitarStringsArr.includes(GuitarStringsEnum.Twelve) ?
                <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" onChange={onGuitarStringsCheckboxChangeHandler} checked /> :
                <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" onChange={onGuitarStringsCheckboxChangeHandler} /> :
              <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
          }
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={onDefaultFilterStateButtonClickHandler} >Очистить</button>
    </form>
  );
}

