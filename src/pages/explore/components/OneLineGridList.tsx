import React, { useEffect, useState } from "react";
import { Button, GridList, GridListTile, Typography } from "@material-ui/core";
import { history, request } from "umi";

import OneLineGridTile from "./OneLineGridTile";
import styles from "../styles.less";

type OneLineGridListProps = {
  item: {
    id: string;
    name: string;
    type: string;
    uri: string;
  };
};

const OneLineGridList = ({ item }: OneLineGridListProps) => {
  const [tracks, setTracks] = useState([]);

  const shuffle = () => {
    request("/me/player/shuffle?state=true", {
      method: "put"
    });

    request("/me/player/play", {
      method: "put",
      body: JSON.stringify({ context_uri: item.uri })
    });
  };

  useEffect(() => {
    item.id &&
      request(`/playlists/${item.id}/tracks?limit=6`).then(response =>
        setTracks(response.items)
      );
  }, [item]);

  return (
    <div className={styles.oneLineGridListWrapper}>
      <div className={styles.oneLineGridHeader}>
        <Button onClick={() => history.push(`/playlists/${item.id}`)}>
          <Typography
            variant="subtitle2"
            align="left"
            style={{ textTransform: "none" }}
          >
            {item.name}
          </Typography>
        </Button>
        <Button onClick={() => shuffle()}>SHUFFLE</Button>
      </div>
      <GridList className={styles.oneLineGridList} cellHeight="auto" cols={3}>
        {tracks.map(track => (
          <GridListTile className={styles.oneLineGridTile}>
            <OneLineGridTile track={track.track} key={track.track.id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default OneLineGridList;
