import React from 'react';
import { Button } from '@material-ui/core';

import pkce from '@/utils/pkce';
// import Logo from '@/assets/300x300.png';
import styles from './styles.less';

export default () => {
  return (
    <div className={styles.loginWrapper}>
      <img /*src={Logo}*/ />
      <br />
      <Button href={pkce.authorizeUrl()} className={styles.loginButton}>
        Log in
      </Button>
    </div>
  );
};
