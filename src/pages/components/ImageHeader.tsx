import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RadioOutlinedIcon from "@material-ui/icons/RadioOutlined";
import { history } from "umi";

import styles from "./styles.less";

type ImageHeaderProps = {
  item: any;
  imageUrl: string;
};

const ImageHeader = ({ item, imageUrl }: ImageHeaderProps) => {
  return (
    <>
      <AppBar elevation={0} color="transparent">
        <Toolbar>
          <ArrowBackIcon htmlColor="white" onClick={() => history.goBack()} />
          <RadioOutlinedIcon
            htmlColor="white"
            onClick={() => history.push(`/radios/${item.type}/${item.id}`)}
            style={{ marginLeft: "auto" }}
          />
        </Toolbar>
      </AppBar>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={styles.headerImage}
      >
        <div className={styles.imageOverlay} />
        <Typography
          variant="h6"
          component="h1"
          align="center"
          className={styles.headerTitle}
        >
          {item.name}
        </Typography>
      </div>
    </>
  );
};

export default ImageHeader;
