import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ConstantValueEnum } from '../../common/enum/constant-value.enum';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { SliceEnum } from '../../common/enum/slice.enum';
import { getTransformDateForOrderComponents } from '../../common/helper/helper';
import { CreateProductType } from '../../common/type/create-product.type';
import { asyncGetProductCardDataByIdAction, asyncUpdateProductByProductIdAction } from '../../store/async-action/async-action';
import { useAppDispatch, useAppSelector } from '../../store/store';

import Breadcrumbs from '../breadcrumbs/Breadcrumbs';


export default function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { productId } = useParams();

  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const guitarTypeWrapperRef = useRef<HTMLDivElement>(null);
  const guitarStringsCountWrapperRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    dispatch(asyncGetProductCardDataByIdAction(productId as string));
  }, []);

  const editProductData = useAppSelector((state) => state[SliceEnum.ProductsSlice].productCardData);

  useEffect(() => {
    if (!editProductData) {
      return;
    }

    const { imageLink, guitarType, guitarStringsCount } = editProductData;

    setImageUrl(`${ConstantValueEnum.TRNASFORM_BACKEND_URL}${imageLink}`);

    guitarTypeWrapperRef.current!.childNodes.forEach((item) => {
      if ((item as HTMLInputElement).value === guitarType) {
        (item as HTMLInputElement).checked = true;
      }
    });
    guitarStringsCountWrapperRef.current!.childNodes.forEach((item) => {
      if (+(item as HTMLInputElement).value === guitarStringsCount) {
        (item as HTMLInputElement).checked = true;
      }
    });
  }, [editProductData]);

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

    if (inputFileRef.current?.files?.length === 0 && imageUrl !== '') {
      formData.set('image', imageUrl);
    }

    dispatch(asyncUpdateProductByProductIdAction({
      productId: productId!,
      productData: formData as CreateProductType & FormData,
    }));
  }, []);


  if (!editProductData) {
    return null;
  }

  const { title, createdAt, price, article, description } = editProductData;


  return (
    <section className="add-item">
      <div className="container">
        <h1 className="edit-item__title">{title}</h1>
        <Breadcrumbs currentPath={RoutePathEnum.EditProductCard} addBreadcrumbString={title} />
        <form ref={formRef} className="edit-item__form" onSubmit={onFormSubmitHandler} >
          <div className="edit-item__form-left">
            <div className="edit-item-image add-item__form-image">
              <div className="edit-item-image__image-wrap" >
                <img style={{
                  maxWidth: '100%',
                }} src={imageUrl} alt="Изображение товара"
                />
              </div>
              <div className="edit-item-image__btn-wrap">
                {
                  imageUrl !== '' ? <input ref={inputFileRef} style={{ width: '0px', height: '0px', position: 'absolute', zIndex: '-1', }} type="file" id="product-image" name="image" accept="image/png, image/jpeg" onChange={onInputFileChangeHandler} /> :
                    <input ref={inputFileRef} style={{ width: '0px', height: '0px', position: 'absolute', zIndex: '-1', }} type="file" id="product-image" name="image" accept="image/png, image/jpeg" onChange={onInputFileChangeHandler} required />
                }
                <button className="button button--small button--black-border edit-item-image__btn" onClick={onAddImageButtonClickHandler} >Заменить</button>
                <button className="button button--small button--black-border edit-item-image__btn" onClick={onRemoveImageButtonClickHandler} >Удалить</button>
              </div>
            </div>
            <div ref={guitarTypeWrapperRef} className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
              <input type="radio" id="guitar" name="guitarType" defaultValue="Acoustic" />
              <label htmlFor="guitar">Акустическая гитара</label>
              <input type="radio" id="el-guitar" name="guitarType" defaultValue="Electro" />
              <label htmlFor="el-guitar">Электрогитара</label>
              <input type="radio" id="ukulele" name="guitarType" defaultValue="Ukulele" />
              <label htmlFor="ukulele">Укулеле</label>
            </div>
            <div ref={guitarStringsCountWrapperRef} className="input-radio add-item__form-radio"><span>Количество струн</span>
              <input type="radio" id="string-qty-4" name="guitarStringsCount" defaultValue={4} />
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
                <input type="text" name="date" defaultValue={getTransformDateForOrderComponents(createdAt)} placeholder="Дата в формате 00.00.0000" readOnly />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите наименование товара</span>
                <input type="text" name="title" placeholder="Наименование" defaultValue={title} minLength={ConstantValueEnum.PRODUCT_TITLE_MIN_LENGTH} maxLength={ConstantValueEnum.PRODUCT_TITLE_MAX_LENGTH} required />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label><span>Введите цену товара</span>
                <input type="number" name="price" placeholder="Цена"defaultValue={price} min={ConstantValueEnum.PRODUCT_PRICE_MIN_VALUE} max={ConstantValueEnum.PRODUCT_PRICE_MAX_VALUE} required />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите артикул товара</span>
                <input type="text" name="article" placeholder="Артикул товара" defaultValue={article} minLength={ConstantValueEnum.PRODUCT_ARTICLE_MIN_LENGTH} maxLength={ConstantValueEnum.PRODUCT_ARTICLE_MAX_LENGTH} required />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea add-item__form-textarea">
              <label><span>Введите описание товара</span>
                <textarea name="description" placeholder="Опишите товар" defaultValue={description} minLength={ConstantValueEnum.PRODUCT_DESCRIPTION_MIN_LENGTH} maxLength={ConstantValueEnum.PRODUCT_DESCRIPTION_MAX_LENGTH} required />
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
