import React from "react";
import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";
import { history } from "umi";

import styles from "./styles.less";

type SmallCardProps = {
  item: {
    id: string;
    name: string;
    images: object[];
    type: string;
    artists?: object[];
  };
};

const SmallCard = ({ item }: SmallCardProps) => {
  return (
    <>
      <Card key={item.id} variant="outlined" className={styles.smallSquareCard}>
        <CardActionArea
          onClick={() => history.push(`/${item.type}s/${item.id}`)}
        >
          <CardMedia
            title={item.name}
            image={item.images[0].url}
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
        {item.type == "album" && (
          <Typography
            variant="caption"
            align="center"
            className={styles.smallSquareCardSubtitle}
          >
            {item.artists?.map((artist: object) => artist.name).join(", ")}
          </Typography>
        )}
      </div>
    </>
  );
};

export default SmallCard;
