import React, { useState } from "react";
import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";
import { history } from "umi";

import PreviewCardWrapper from "./PreviewCardWrapper";
import styles from "./styles.less";

type SmallCardProps = {
  item: any;
};

const SmallCard = ({ item }: SmallCardProps) => {
  const [playing, setPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <Card key={item.id} variant="outlined" className={styles.smallCard}>
        <CardActionArea onClick={() => setPlaying(!playing)}>
          <CardMedia title={item.name}>
            {item.type == "track" ? (
              <div
                onClick={event => setAnchorEl(event.currentTarget)}
                style={{
                  background: `url(${item.album.images[0]?.url})`,
                  width: "100%",
                  height: "350px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  verticalAlign: "-webkit-baseline-middle"
                }}
              />
            ) : (
              <div
                style={{
                  background: `url(${item.images[0].url})`,
                  width: "100%",
                  height: "350px",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
            )}
            <div
              onClick={() =>
                history.push(
                  item.type == "artist"
                    ? `artists/${item.id}`
                    : `/albums/${item.album.id}`
                )
              }
              className={styles.smallCardInfoWrapper}
            >
              <Typography variant="body1" className={styles.smallCardTitle}>
                {item.name}
              </Typography>
              <Typography variant="caption" className={styles.smallCardArtist}>
                {item.artists
                  ? item.artists.map(artist => artist.name).join(", ")
                  : item.description}
              </Typography>
            </div>
          </CardMedia>
        </CardActionArea>
      </Card>
      <PreviewCardWrapper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        item={item}
      />
    </>
  );
};

export default SmallCard;
