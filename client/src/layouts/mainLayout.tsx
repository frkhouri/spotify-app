import React from 'react';

import Player from './components/Player';
import BottomBar from './components/BottomBar';
import styles from './styles.less';

type MainLayoutProps = {
  children?: any;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div className={styles.body}>{children}</div>
      <Player />
      <BottomBar />
    </>
  );
};

export default MainLayout;
