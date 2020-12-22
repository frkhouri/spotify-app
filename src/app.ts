import { useState } from "react";
import { history, request as r, useModel } from "umi";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

serviceWorkerRegistration.register();

//const [token, setToken] = useState('');

const token = window.localStorage.getItem("token");
//console.log(window.localStorage);
//var token = '';

/*if (history.location.pathname != '/login') {
  token = window.localStorage.getItem('token');
}
*/
//const token = useModel('@@initialState').initialState?.token;

export const request = {
  headers: {
    Authorization: "Bearer " + token
  },
  prefix: "https://api.spotify.com/v1"
  //errorHandler: () => history.push('/login'),
};

export async function getInitialState(): Promise<{ token?: string }> {
  return {};
}

/*export async function getInitialState(): Promise<{ currentUser?: any }> {
  if (history.location.pathname != '/login') {
    //setToken(window.localStorage.getItem('token'));
    /*const hash = window.location.hash.substr(1);
    const hashParams = hash.split('&').reduce(function (res, item) {
      const parts = item.split('=');
      res[parts[0]] = parts[1];
      return res;
    }, {});
    token = hashParams.access_token;*/

/*try {
      const currentUser = await r('/');
      console.log(currentUser);
      return {
        currentUser,
      };
    } catch (error) {
      history.push('/login');
    }
  }
  return {}
};
*/
