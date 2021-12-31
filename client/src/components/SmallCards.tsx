import React, { useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import SmallCard from './SmallCard';
// import Play from '@/utils/play';
import useRequest from '@/utils/useRequest';
import styles from './styles.less';

type SmallCardsProps = {
  item: {
    id: string;
    name: string;
    type: string;
    uri: string;
  };
  isLoading: boolean;
};

const SmallCards = ({ items, isLoading }: SmallCardsProps) => {
  const shuffle = () => {
    useRequest({
      endpoint: 'me/player/shuffle?state=true',
      method: 'put',
    });

    // Play(body);
  };

  return (
    <div className={styles.smallCardsWrapper}>
      {!isLoading
        ? items.length > 0 &&
          items.map((item) => (
            <SmallCard key={item.track.id} track={item.track} />
          ))
        : [1, 2, 3, 4].map((_a, i) => (
            <Skeleton
              key={i}
              variant="rect"
              width={105}
              height={105}
              className={styles.cardSkeleton}
            />
          ))}
    </div>
  );
};

export default SmallCards;
