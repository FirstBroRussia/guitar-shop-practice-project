import { PropsWithChildren } from 'react';

type MainPropsType = {
  children: PropsWithChildren<JSX.Element>;
};

export default function Main({ children }: MainPropsType) {

  // useLayoutEffect(() => {});

  return (
    <main className="page-content">
      <div className="container">
        {children}
      </div>
    </main>
  );
}
