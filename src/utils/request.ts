import { RequestConfig, useModel } from "umi";
import { extend } from "umi-request";

const token = useModel("@@initialState").initialState?.token;

const ApiRequest = () => {
  const request = extend({
    headers: {
      Authorization: "Bearer " + token
    },
    prefix: "https://api.spotify.com/v1"
  });

  return request;
};

/*
export const request: RequestConfig = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    prefix: 'https://api.spotify.com/v1',
    //errorHandler: () => history.push('/login'),
};*/

export default apiRequest;
