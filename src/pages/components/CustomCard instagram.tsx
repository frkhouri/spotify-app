import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import { history, request } from "umi";

import styles from "./styles.less";

const CustomCard = ({ track, cardAction }) => {
  return (
    <Card key={track.id} variant="outlined" square>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle2" component="h2">
            {track.artists.map(artist => artist.name).join(", ")}
          </Typography>
        }
        className={styles.cardHeader}
      />
      <CardActionArea /*onClick={() => cardAction()}*/>
        <CardMedia
          component="img"
          image={track.album.images[0].url}
          title={track.name}
        />
        <CardContent className={styles.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            {track.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {track.album.release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className={styles.cardActions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
