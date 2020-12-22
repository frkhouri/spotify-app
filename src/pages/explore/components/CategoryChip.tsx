import React from "react";
import { Chip } from "@material-ui/core";
import { history } from "umi";

import styles from "../styles.less";

type CategoryChipProps = {
  category: any;
};

const CategoryChip = ({ category }: CategoryChipProps) => {
  return (
    <Chip
      label={category.name}
      variant="outlined"
      size="small"
      className={styles.categoryChip}
      onClick={() => history.push(`/categories/${category.id}`)}
    />
  );
};

export default CategoryChip;
