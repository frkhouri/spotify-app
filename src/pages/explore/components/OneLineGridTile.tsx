import React, { useState } from "react";

import PreviewCardWrapper from "@/pages/components/PreviewCardWrapper";
import styles from "../styles.less";

type OneLineGridTileProps = {
  track: {
    id: string;
    name: string;
    album: {
      images: Array<{
        url: string;
      }>;
    };
    artists: Array<{
      name: string;
    }>;
  };
};

const OneLineGridTile = ({ track }: OneLineGridTileProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <img
        src={track.album.images[0].url}
        onClick={event => setAnchorEl(event.target)}
        className={styles.oneLineGridTileImage}
      />
      <PreviewCardWrapper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        item={track}
      />
    </>
  );
};

export default OneLineGridTile;
