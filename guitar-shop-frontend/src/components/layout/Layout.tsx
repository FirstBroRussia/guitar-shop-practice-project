import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import { setToastifyFnAction } from '../../store/slice/data.slice';
import { useAppDispatch } from '../../store/store';

import 'react-toastify/dist/ReactToastify.css';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import GuitarSvg from '../svg/Guitar.svg';


export default function Layout() {
  const dispatch = useAppDispatch();

  const toastNotify = (content: string, type?: TypeOptions) => toast(content, {
    autoClose: 5000,
    closeButton: true,
    closeOnClick: true,
    containerId: 'toastify',
    position: 'top-right',
    theme: 'light',
    pauseOnHover: false,
    type: type || 'default',
    style: {
      zIndex: 100,
    },
  });

  useEffect(() => {
    dispatch(setToastifyFnAction(toastNotify));
  }, []);


  return (
    <body style={{
      position: 'relative',
    }}
    >
      <ToastContainer />
      <div className="visually-hidden">
        <GuitarSvg />
      </div>
      <div className="wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </body>
  );
}
