import React from "react";
import ShuffleIcon from "@material-ui/icons/shuffle";

import Play from "@/utils/play";
import ApiRequest from "@/utils/request";
import ItemList from "./ItemList";

type ShuffleButtonProps = {
  body: object;
};

const ShuffleButton = ({ body }: ShuffleButtonProps) => {
  const shuffleAll = () => {
    ApiRequest({
      endpoint: "/me/player/shuffle?state=true",
      method: "put"
    });

    Play(body);
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
