import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import styles from "./styles.less";

const CardSkeleton = () => {
  return (
    <Card variant="outlined" className={styles.card}>
      <CardMedia>
        <Skeleton variant="rect" width="100%" height="350px" />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6">
          <Skeleton variant="text" component="h6" width="100%" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton variant="text" width="67%" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
