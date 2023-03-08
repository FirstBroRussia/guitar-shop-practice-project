import { PropsWithChildren } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import GuitarSvg from '../svg/Guitar.svg';

type LayoutPropsType = {
  children: PropsWithChildren<JSX.Element>;
};

export default function Layout({ children }: LayoutPropsType) {


  return (
    <body>
      <div className="visually-hidden">
        <GuitarSvg />
      </div>
      <div className="wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </body>
  );
}
