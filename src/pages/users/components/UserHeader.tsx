import React from "react";
import { Avatar, Container, Grid } from "@material-ui/core";

import styles from "../styles.less";

type UserHeaderProps = {
  user: {
    display_name: string;
    images: any;
    followers: any;
  };
};

const UserHeader = ({ user }: UserHeaderProps) => {
  return (
    <Grid container className={styles.userHeader}>
      <Grid item>
        <Avatar
          alt={user.display_name}
          src={user.images[0] ? user.images[0].url : "none"}
        />
      </Grid>
      <Grid item>{user.followers.total}</Grid>
    </Grid>
  );
};

export default UserHeader;
