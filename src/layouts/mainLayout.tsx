import React, { useEffect, useState } from "react";
import { history, useModel } from "umi";

import BottomBar from "./components/BottomBar";
import styles from "./styles.less";

type MainLayoutProps = {
  children: any;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const token = useModel("@@initialState").initialState?.token;
  const [loggedIn, setLoggedIn] = useState(false);
  const setInitialState = useModel("@@initialState").setInitialState;

  const getToken = (hash: string) => {
    const hashParams = hash.split("&").reduce(function(res, item) {
      const parts = item.split("=");
      res[parts[0]] = parts[1];
      return res;
    }, {});
    setInitialState({ token: hashParams.access_token });
    localStorage.setItem("token", hashParams.access_token);
    setLoggedIn(true);
  };

  useEffect(() => {
    if (!token) {
      const hash = window.location.hash.substr(1);
      if (hash.includes("access_token")) {
        getToken(hash);
      } else {
        history.push("/login");
      }
    }
  }, [token]);
  /*const hash = window.location.hash.substr(1);
    console.log(window.location.hash);
        const hashParams = hash.split('&').reduce(function (res, item) {
            const parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});*/
  /*useEffect(() => {
        const hash = window.location.hash.substr(1);
    console.log(window.location.hash);
        const hashParams = hash.split('&').reduce(function (res, item) {
            const parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});
        if (hashParams) {
        localStorage.setItem('token', hashParams.access_token);
        console.log('effect');
        setToken(hashParams.access_token);
        }
    }, []);*/

  return (
    <>
      {loggedIn && (
        <>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <div className={styles.body}>{children}</div>
          <BottomBar />
        </>
      )}
    </>
  );
};

export default MainLayout;
