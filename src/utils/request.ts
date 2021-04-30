import { extend } from "umi-request";

type ApiRequestProps = {
  endpoint: string;
  method?: string;
  body?: any;
};

export const ApiRequest = ({ endpoint, method, body }: ApiRequestProps) => {
  const token = localStorage.getItem("token");

  const request = extend({
    headers: {
      Authorization: "Bearer " + token
    },
    prefix: "https://api.spotify.com/v1",
    method: method,
    body: body
  });

  return request(endpoint, {});
};

export default ApiRequest;
