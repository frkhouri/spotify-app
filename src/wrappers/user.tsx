import React, { useEffect, useState } from "react";
import { useHistory, useModel } from "umi";

type Props = {
  props: any;
};

export default (props: Props) => {
  const setInitialState = useModel("@@initialState").setInitialState;
  const [token, setToken] = useState({});
  const history = useHistory();
  const hash = window.location.hash.substr(1);
  const hashParams = hash.split("&").reduce(function(res, item) {
    const parts = item.split("=");
    res[parts[0]] = parts[1];
    return res;
  }, {});

  useEffect(() => {
    if (hashParams.access_token) {
      setInitialState({ token: hashParams.access_token });
    }
  }, [hashParams.access_token]);

  return <div>{props.children}</div>;
};
