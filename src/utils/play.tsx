//import React, {useState} from "react";
//import Snackbar from "@material-ui/core/Snackbar";
//import MuiAlert from "@material-ui/lab/Alert";

import ApiRequest from "./request";

const Play = tracks => {
  //const [open, setOpen] = useState(false);

  /*const handleClose = () => {
    setOpen(false);
  };*/

  ApiRequest({
    endpoint: "/me/player"
  }).then(response => {
    if (!response) {
      ApiRequest({
        endpoint: "/me/player/devices"
      }).then(response => {
        if (response.devices[0]) {
          const body = {
            device_ids: [response.devices[0].id]
          };

          ApiRequest({
            endpoint: "/me/player",
            method: "put",
            body: JSON.stringify(body)
          });
        }
      });
    }
  });

  ApiRequest({
    endpoint: "/me/player/play",
    method: "put",
    body: JSON.stringify(tracks)
  });

  return;
};

export default Play;
