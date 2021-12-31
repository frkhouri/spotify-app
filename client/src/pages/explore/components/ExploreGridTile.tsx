import React, { useState } from 'react';
import { CardActionArea, CardMedia, Paper } from '@material-ui/core';

import PreviewCardWrapper from '@/components/PreviewCardWrapper';
import styles from '../styles.less';

type ExploreGridTileProps = {
  track: {
    id: string;
    name: string;
    type: string;
    uri: string;
    images?: Array<{
      url: string;
    }>;
    album: {
      images: Array<{
        url: string;
      }>;
    };
  };
};

const ExploreGridTile = ({ track }: ExploreGridTileProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <React.Fragment key={track.id}>
      <div className={styles.exploreGridTile}>
        <Paper square>
          <CardActionArea onClick={(event) => setAnchorEl(event.target)}>
            <CardMedia
              title={track.name}
              image={
                track.images ? track.images[0].url : track.album.images[0].url
              }
              className={styles.exploreGridTileImage}
            />
          </CardActionArea>
          <PreviewCardWrapper
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            item={track}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default ExploreGridTile;
