/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { getTransformDateForOrderComponents } from '../../common/helper/helper';
import { CreateProductType } from '../../common/type/create-product.type';
import { asyncPostNewProductAction } from '../../store/async-action/async-action';
import { useAppDispatch } from '../../store/store';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';


export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState('');


  const onAddImageButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    inputFileRef.current?.click();
  }, []);

  const onRemoveImageButtonClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();

    inputFileRef.current!.value = '';
    setImageUrl('');
  }, []);

  const onInputFileChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    evt.preventDefault();

    if (inputFileRef.current?.files?.length === ConstantValueEnum.ZERO_VALUE) {
      setImageUrl('');

      return;
    }

    setImageUrl(URL.createObjectURL(inputFileRef.current!.files!.item(0)!));
  }, []);

  const onFormSubmitHandler: React.FormEventHandler<HTMLFormElement> = useCallback((evt) => {
    evt.preventDefault();

    const formData = new FormData(formRef.current!);

    dispatch(asyncPostNewProductAction(formData as CreateProductType & FormData));
  }, []);


  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>
        <Breadcrumbs currentPath={RoutePathEnum.AddProductCard} />
        <form ref={formRef} className="add-item__form" action="#" method="get" onSubmit={onFormSubmitHandler} >
          <div className="add-item__form-left">
            <div className="edit-item-image add-item__form-image">
              <div className="edit-item-image__image-wrap" >
                <img style={{
                  maxWidth: '100%',
                }} src={imageUrl} alt="Изображение товара"
                />
              </div>
              <div className="edit-item-image__btn-wrap">
                <input ref={inputFileRef} style={{ width: '0px', height: '0px', position: 'absolute', zIndex: '-1', }} type="file" id="product-image" name="image" accept="image/png, image/jpeg" onChange={onInputFileChangeHandler} required />
                <button className="button button--small button--black-border edit-item-image__btn" onClick={onAddImageButtonClickHandler} >Добавить</button>
                <button className="button button--small button--black-border edit-item-image__btn" onClick={onRemoveImageButtonClickHandler} >Удалить</button>
              </div>
            </div>
            <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
              <input type="radio" id="guitar" name="guitarType" defaultValue="Acoustic" />
              <label htmlFor="guitar">Акустическая гитара</label>
              <input type="radio" id="el-guitar" name="guitarType" defaultValue="Electro" defaultChecked />
              <label htmlFor="el-guitar">Электрогитара</label>
              <input type="radio" id="ukulele" name="guitarType" defaultValue="Ukulele" />
              <label htmlFor="ukulele">Укулеле</label>
            </div>
            <div className="input-radio add-item__form-radio"><span>Количество струн</span>
              <input type="radio" id="string-qty-4" name="guitarStringsCount" defaultValue={4} defaultChecked />
              <label htmlFor="string-qty-4">4</label>
              <input type="radio" id="string-qty-6" name="guitarStringsCount" defaultValue={6} />
              <label htmlFor="string-qty-6">6</label>
              <input type="radio" id="string-qty-7" name="guitarStringsCount" defaultValue={7} />
              <label htmlFor="string-qty-7">7</label>
              <input type="radio" id="string-qty-12" name="guitarStringsCount" defaultValue={12} />
              <label htmlFor="string-qty-12">12</label>
            </div>
          </div>
          <div className="add-item__form-right">
            <div className="custom-input add-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" defaultValue={getTransformDateForOrderComponents(new Date().toISOString())} placeholder="Дата в формате 00.00.0000" readOnly />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите наименование товара</span>
                <input type="text" name="title" placeholder="Наименование" minLength={ConstantValueEnum.PRODUCT_TITLE_MIN_LENGTH} maxLength={ConstantValueEnum.PRODUCT_TITLE_MAX_LENGTH} required />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label><span>Введите цену товара</span>
                <input type="number" name="price" placeholder="Цена" min={ConstantValueEnum.PRODUCT_PRICE_MIN_VALUE} max={ConstantValueEnum.PRODUCT_PRICE_MAX_VALUE} required />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите артикул товара</span>
                <input type="text" name="article" placeholder="Артикул товара" minLength={ConstantValueEnum.PRODUCT_ARTICLE_MIN_LENGTH} maxLength={ConstantValueEnum.PRODUCT_ARTICLE_MAX_LENGTH} required />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea add-item__form-textarea">
              <label><span>Введите описание товара</span>
                <textarea name="description" placeholder="Опишите товар" defaultValue={''} minLength={ConstantValueEnum.PRODUCT_DESCRIPTION_MIN_LENGTH} maxLength={ConstantValueEnum.PRODUCT_DESCRIPTION_MAX_LENGTH} required />
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="add-item__form-buttons-wrap">
            <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
            <button className="button button--small add-item__form-button" type="button" onClick={() => navigate(RoutePathEnum.ProductList)} >Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
