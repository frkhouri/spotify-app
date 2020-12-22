import React from "react";
import { Typography } from "@material-ui/core";

import styles from "./styles.less";

type ListHeadingProps = {
  heading: string;
};

const ListHeading = ({ heading }: ListHeadingProps) => {
  return (
    <Typography variant="h6" className={styles.listHeading}>
      {heading}
    </Typography>
  );
};

export default ListHeading;
