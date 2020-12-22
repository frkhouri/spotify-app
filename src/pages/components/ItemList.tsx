import React from "react";
import { Grid, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import styles from "./styles.less";

type ItemListProps = {
  item: {
    name: string;
  };
  imageUrl?: string;
  image?: any;
  number?: number;
  artists?: Array<object>;
  action?: any;
};

const ItemList = ({
  item,
  imageUrl,
  image,
  number,
  artists,
  action
}: ItemListProps) => {
  return (
    <ListItem button disableGutters onClick={() => action(item)}>
      <Grid container alignItems="center">
        {number && (
          <Grid item xs={1}>
            <ListItemText
              secondary={`${number}. `}
              className={styles.listItemNumber}
            />
          </Grid>
        )}
        {imageUrl && (
          <Grid item xs={2}>
            <ListItemIcon>
              <img
                src={imageUrl}
                className={
                  item.type == "artist"
                    ? styles.listItemAvatar
                    : styles.listItemImage
                }
              />
            </ListItemIcon>
          </Grid>
        )}
        {image && (
          <Grid item xs={2} justify="center">
            <ListItemIcon>{image}</ListItemIcon>
          </Grid>
        )}
        <Grid item xs={9}>
          <ListItemText
            primary={item.name}
            secondary={artists?.map(artist => artist.name).join(", ")}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ItemList;
