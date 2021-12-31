import React, { useEffect, useState } from 'react';
import { history } from 'umi';

export default (props) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
        console.log('getting token');
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  if (token === '') {
      console.log('auth redirect');
    history.replace('/login');
  }

  return <div>{props.children}</div>;
};
