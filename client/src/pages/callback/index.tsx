import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { history } from 'umi';

import pkce from '@/utils/pkce';

const CallbackPage = () => {
  const [accesstoken, setAccessToken] = useState(String)
  useEffect(() => {
    if (!localStorage.access_token) {
      const url = window.location.href;
      pkce.exchangeForAccessToken(url).then((response: any) => {
        const date = new Date();
        date.setSeconds(date.getSeconds() + response.expires_in)
        setAccessToken(response.access_token);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('token_expiry', date.toString());
      })
      .catch(() => history.push('/login'));
    } else {
      console.log(localStorage);
      history.push('/')
    }
  }), [accesstoken];

  return <CircularProgress />;
};

export default CallbackPage;
