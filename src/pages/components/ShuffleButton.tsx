import React from "react";
import ShuffleIcon from "@material-ui/icons/shuffle";

import apiRequest from "@/utils/request";
import ItemList from "./ItemList";

type ShuffleButtonProps = {
  body: object;
};

const ShuffleButton = ({ body }: ShuffleButtonProps) => {
  const shuffleAll = () => {
    apiRequest({
      endpoint: "/me/player/shuffle?state=true",
      method: "put"
    });

    apiRequest({
      endpoint: "/me/player/play",
      method: "put",
      body: JSON.stringify(body)
    });
  };

  return (
    <ItemList
      item={{ name: "Shuffle all" }}
      image={<ShuffleIcon />}
      action={shuffleAll}
    />
  );
};

export default ShuffleButton;
