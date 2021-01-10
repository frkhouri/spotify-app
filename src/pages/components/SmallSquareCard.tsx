import React from "react";
import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";
import { history } from "umi";

import styles from "./styles.less";

type SmallSquareCardProps = {
  item: {
    id: string;
    name: string;
    images: object[];
    type: string;
    artists?: object[];
  };
};

const SmallSquareCard = ({ item }: SmallSquareCardProps) => {
  return (
    <div className={styles.smallSquareCard}>
      <Card key={item.id} variant="elevation" elevation={0}>
        <CardActionArea
          onClick={() => history.push(`/${item.type}s/${item.id}`)}
        >
          <CardMedia
            title={item.name}
            image={item.images ? item.images[0].url : item.album.images[0].url}
            className={styles.smallSquareCardImage}
          />
        </CardActionArea>
      </Card>
      <div
        onClick={() => history.push(`/${item.type}s/${item.id}`)}
        className={styles.smallSquareCardInfoWrapper}
      >
        <Typography
          variant="caption"
          align="center"
          className={styles.smallSquareCardTitle}
        >
          {item.name}
        </Typography>
        {
          <Typography
            variant="caption"
            align="center"
            className={styles.smallSquareCardSubtitle}
          >
            {item.artists?.map((artist: object) => artist.name).join(", ")}
          </Typography>
        }
      </div>
    </div>
  );
};

export default SmallSquareCard;
