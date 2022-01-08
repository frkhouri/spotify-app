import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { history } from 'umi';

import styles from '../styles.less';

type TallCardsProps = {
  items: any;
  isLoading: boolean;
};

type ItemProps = {
  id: string;
  name: string;
  type: string;
  album: {
    id: string;
    images: Array<{
      url: string;
    }>;
  };
  images: Array<{
    url: string;
  }>;
  artists: Array<{
    id: string;
    name: string;
  }>;
  description: string;
};

const TallCards = ({ items, isLoading }: TallCardsProps) => {
  const [playing, setPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <div className={styles.tallCardWrapper}>
        {!isLoading
          ? items.map((item: ItemProps) => (
              <React.Fragment key={item.id}>
                <Card variant="outlined" className={styles.tallCard}>
                  <CardActionArea onClick={() => setPlaying(!playing)}>
                    <CardMedia title={item.name}>
                      {item.type == 'track' ? (
                        <div
                          onClick={(event) => setAnchorEl(event.currentTarget)}
                          style={{
                            background: `url(${item.album.images[0]?.url})`,
                            width: '100%',
                            height: '350px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            verticalAlign: '-webkit-baseline-middle',
                          }}
                        />
                      ) : (
                        <div
                          onClick={() =>
                            history.push(
                              item.type == 'artist'
                                ? `artists/${item.id}`
                                : `/albums/${item.album.id}`,
                            )
                          }
                          style={{
                            background: `url(${item.images[0].url})`,
                            width: '100%',
                            height: '350px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                      )}
                      <div
                        onClick={() =>
                          history.push(
                            item.type == 'artist'
                              ? `artists/${item.id}`
                              : `/albums/${item.album.id}`,
                          )
                        }
                        className={styles.tallCardInfoWrapper}
                      >
                        <Typography
                          variant="body1"
                          className={styles.tallCardTitle}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          className={styles.tallCardArtist}
                        >
                          {item.artists
                            ? item.artists
                                .map((artist) => artist.name)
                                .join(', ')
                            : item.description}
                        </Typography>
                      </div>
                    </CardMedia>
                  </CardActionArea>
                </Card>
                {/* <PreviewCardWrapper
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                item={item}
              /> */}
              </React.Fragment>
            ))
          : [1, 2, 3, 4].map((_a, i) => (
              <Skeleton
                key={i}
                variant="rect"
                width={200}
                height={350}
                className={styles.tallCardSkeleton}
              />
            ))}
      </div>
    </>
  );
};

export default TallCards;