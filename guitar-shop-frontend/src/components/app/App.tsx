/* eslint-disable react/no-children-prop */
// children={<Test />}

import { HashRouter, Route, Routes } from 'react-router-dom';
import { RoutePathEnum } from '../../common/enum/route-path.enum';
// import { setCurrentPathAction } from '../../store/slice/data.slice';
// import { useAppDispatch } from '../../store/store';
import Catalog from '../catalog/Catalog';

import Layout from '../layout/Layout';
import Main from '../main/Main';


export default function App(): JSX.Element {

  // const dispatch = useAppDispatch();

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={RoutePathEnum.Main} element={
            <Main>
              <Catalog />
            </Main>
          }
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
