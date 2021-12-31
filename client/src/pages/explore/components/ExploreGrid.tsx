import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  ImageList,
  ImageListItem,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import ExploreGridTile from './ExploreGridTile';
import useRequest from '@/utils/useRequest';
import styles from '../styles.less';

type ExploreGridProps = {
  recentTrackIds: string;
};

const ExploreGrid = ({ recentTrackIds }: ExploreGridProps) => {
  async function getTracks(popularity: number) {
    recentTrackIds &&
      (await useRequest({
        endpoint: `recommendations?seed_tracks=${recentTrackIds}&max_popularity=${popularity}`,
      }).then((res) => {
        const allTracks = _.uniqBy([...tracks, ...res.tracks], 'id');
        if (allTracks.length === tracks.length) {
          popularity === 100
            ? (setEndReached(true), console.log('end reached'))
            : (setMaxPopularity(popularity + 10), getTracks(popularity + 10));
        }
        
        setTracks(allTracks);
        setIsLoading(false);
      }));
      
    return;
  }

  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPopularity, setMaxPopularity] = useState(20);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    if (recentTrackIds) {
      getTracks(maxPopularity);
    }
  }, [recentTrackIds]);

  return (
    <>
      <Typography variant="h6" className={styles.heading}>
        Discover something new
      </Typography>
      <div className={styles.exploreGridWrapper}>
        <InfiniteScroll
          dataLength={tracks.length}
          next={() => getTracks(maxPopularity)}
          hasMore={!endReached}
          loader={
            <div className={styles.loadingSpinner}>
              <CircularProgress />
            </div>
          }
          endMessage={
            <Typography
              variant="caption"
              align="center"
              className={styles.endMessage}
            >
              You've reached the end
            </Typography>
          }
          style={{ 'overflowX': 'hidden' }}
        >
          <ImageList cols={3} rowHeight={'auto'}>
            {!isLoading
              ? tracks.map((track: object) => (
                  <ImageListItem key={track.id} cols={1}>
                    <ExploreGridTile track={track} />
                  </ImageListItem>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_a, i) => (
                  <div key={i} className={styles.exploreGridTile}>
                    <Skeleton
                      key={i}
                      variant="rect"
                      className={styles.tileSkeleton}
                    />
                  </div>
                ))}
          </ImageList>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ExploreGrid;
