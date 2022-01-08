import { history, request } from 'umi';

import pkce from './pkce';

type useRequestProps = {
  endpoint: string;
  method?: string;
  body?: string;
};

async function useRequest({ endpoint, method, body }: useRequestProps) {
  console.log('query');

  if (
    !localStorage.access_token ||
    new Date(localStorage.token_expiry) < new Date()
  ) {
    if (!localStorage.refresh_token) {
      history.push('/login');
    } else {
      const url = window.location.href;
      const authBody = {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refresh_token'),
        client_id: pkce.config.client_id,
      };
      const searchParams = Object.keys(authBody)
        .map((key) => {
          return (
            encodeURIComponent(key) + '=' + encodeURIComponent(authBody[key])
          );
        })
        .join('&');

      await request(pkce.config.token_endpoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: searchParams,
      })
        .then((response: any) => {
          console.log('refresh response: ', response);
          const date = new Date();
          date.setSeconds(date.getSeconds() + response.expires_in);
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('token_expiry', date.toString());
        })
        .catch((e) => {
          console.log('catch');
          console.log(e);
          console.log(url);
          // history.push('/login');
        });
    }
  }

  const data = request(`https://api.spotify.com/v1/${endpoint}`, {
    method: method,
    body: body,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  });

  return data;
}

export default useRequest;
