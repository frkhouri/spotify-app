import { extend } from "umi-request";

const getAccessToken = () => localStorage.getItem("token");

export const apiRequest = ({ endpoint, method, body }) => {
  const token = getAccessToken();
  console.log(endpoint);

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

export default apiRequest;
