/* eslint-disable react/no-children-prop */

import { Navigate, Route, Routes } from 'react-router-dom';

import { RoutePathEnum } from '../../common/enum/route-path.enum';
import { useCheckAuthToken } from '../../hooks/useAuthCheck';
import { useCompleteSendNewOrder } from '../../hooks/useCompleteSendNewOrder';
import { useCompleteSendNewReview } from '../../hooks/useCompleteSendNewReview';
import { useCustomNavigateForRedux } from '../../hooks/useCustomNavigateForRedux';
import { useInitAction } from '../../hooks/useInitAction';
import AddProduct from '../add-product/Add-product';
import Cart from '../cart/Cart';

import Catalog from '../catalog-list/Catalog';
import EditProduct from '../edit-product/Edit-product';
import Layout from '../layout/Layout';
import Login from '../login/Login';
import Main from '../main/Main';
import NotFound from '../Not-found';
import OrderInfo from '../order-list/order-info/Order-info';
import OrderList from '../order-list/Order-list';
import AdminPrivateRoute from '../private-route/Admin-private-route';
import PrivateRoute from '../private-route/Private-route';
import ProductInfo from '../product-info/Product-info';
import ProductList from '../product-list/Product-list';
import Register from '../register/Register';


export default function App(): JSX.Element {
  useInitAction();
  useCheckAuthToken();
  useCustomNavigateForRedux();
  useCompleteSendNewReview();
  useCompleteSendNewOrder();


  return (
    <Routes>
      <Route element={<Layout />} >
        <Route index path={RoutePathEnum.Main} element={
          <Navigate to={RoutePathEnum.Catalog} />
        }
        />
        <Route path={RoutePathEnum.Catalog} element={
          <Main>
            <Catalog />
          </Main>
        }
        />
        <Route path={RoutePathEnum.Register} element={
          <Main>
            <Register />
          </Main>
        }
        />
        <Route path={RoutePathEnum.Login} element={
          <Main>
            <Login />
          </Main>
        }
        />
        <Route path={`${RoutePathEnum.ProductCard}`} element={
          <Main>
            <ProductInfo />
          </Main>
        }
        />
        <Route path={RoutePathEnum.Cart} element={
          <PrivateRoute children={
            <Main>
              <Cart />
            </Main>
          }
          />
        }
        />
        <Route path={RoutePathEnum.OrderList} element={
          <AdminPrivateRoute children={
            <Main>
              <OrderList />
            </Main>
          }
          />
        }
        />
        <Route path={RoutePathEnum.Order} element={
          <AdminPrivateRoute children={
            <Main>
              <OrderInfo />
            </Main>
          }
          />
        }
        />
        <Route path={RoutePathEnum.ProductList} element={
          <AdminPrivateRoute children={
            <Main>
              <ProductList />
            </Main>
          }
          />
        }
        />
        <Route path={RoutePathEnum.AddProductCard} element={
          <AdminPrivateRoute children={
            <Main>
              <AddProduct />
            </Main>
          }
          />
        }
        />
        <Route path={RoutePathEnum.EditProductCard} element={
          <AdminPrivateRoute children={
            <Main>
              <EditProduct />
            </Main>
          }
          />
        }
        />

        <Route path={RoutePathEnum.NotFound} element={
          <Main>
            <NotFound />
          </Main>
        }
        />
      </Route>
    </Routes>
  );
}
