import React from 'react';
import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { history } from 'umi';

import styles from './styles.less';

type MediumCardsProps = {
  items: {
    id: string;
    name: string;
    images: object[];
    type: string;
    artists?: object[];
  };
  isLoading: boolean;
};

const MediumCards = ({ items, isLoading }: MediumCardsProps) => {
  return (
    <div className={styles.mediumCardWrapper}>
      {!isLoading
        ? items.map((item: ItemProps) => (
            <div key={item.id} className={styles.mediumCard}>
              <Card variant="elevation" elevation={0}>
                <CardActionArea
                  onClick={() => history.push(`/${item.type}s/${item.id}`)}
                >
                  <CardMedia
                    title={item.name}
                    image={
                      item.images
                        ? item.images[0].url
                        : item.album.images[0].url
                    }
                    className={styles.mediumCardImage}
                  />
                </CardActionArea>
              </Card>
              <div
                onClick={() => history.push(`/${item.type}s/${item.id}`)}
                className={styles.mediumCardInfoWrapper}
              >
                <Typography
                  variant="caption"
                  align="center"
                  className={styles.mediumCardTitle}
                >
                  {item.name}
                </Typography>
                {
                  <Typography
                    variant="caption"
                    align="center"
                    className={styles.mediumCardSubtitle}
                  >
                    {item.artists
                      ?.map((artist: object) => artist.name)
                      .join(', ')}
                  </Typography>
                }
              </div>
            </div>
          ))
        : [1, 2, 3, 4].map((_a, i) => (
            <div key={i} className={styles.mediumCard}>
              <Skeleton
                key={i}
                variant="rect"
                width={150}
                height={150}
                className={styles.cardSkeleton}
              />
              <div className={styles.infoWrapperSkeleton}>
                <Skeleton width={140} height={20} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
          ))}
    </div>
  );
};

export default MediumCards;
