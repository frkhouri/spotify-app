import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import PreviewCardWrapper from './PreviewCardWrapper';
import styles from './styles.less';

type SmallCardProps = {
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

const SmallCard = ({ track }: SmallCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <React.Fragment key={track.id}>
      <div className={styles.smallCard}>
        <Card variant="elevation" elevation={0}>
          <CardActionArea onClick={(event) => setAnchorEl(event.target)}>
            <CardMedia
              title={track.name}
              image={
                track.images ? track.images[0].url : track.album.images[0].url
              }
              className={styles.smallCardImage}
            />
          </CardActionArea>
          <PreviewCardWrapper
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            item={track}
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SmallCard;
