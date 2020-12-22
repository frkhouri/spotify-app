import React from "react";
import { Button } from "@material-ui/core";
import { request } from "umi";

import Logo from "@/assets/300x300.png";
import styles from "./styles.less";

const loginUrl =
  "https://accounts.spotify.com/authorize" +
  "?client_id=" +
  client_id +
  "&response_type=" +
  response_type +
  "&redirect_uri=" +
  redirect_uri +
  "&scope=" +
  scope;

export default () => {
  /*const authorize = () => {
        request('https://accounts.spotify.com/authorize', {
            params: {
                client_id: '8844a79bfd4d467e9ed94005a6b9da4b',
                response_type: 'code',
                redirect_uri: 'http://localhost:8000',
            },
        });
    };*/

  return (
    <div className={styles.loginWrapper}>
      <img src={Logo} />
      <br />
      <Button href={loginUrl} className={styles.loginButton}>
        Log in
      </Button>
    </div>
  );
};
