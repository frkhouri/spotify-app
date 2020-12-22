import React from "react";
import { Card, CardMedia } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import styles from "./styles.less";

const SmallCardSkeleton = () => {
  return (
    <Card variant="outlined" className={styles.smallCard}>
      <CardMedia>
        <Skeleton variant="rect" width="100%" height="350px" />
      </CardMedia>
    </Card>
  );
};

export default SmallCardSkeleton;
