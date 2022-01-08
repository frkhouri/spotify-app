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

type TrackProps = {
  id: string;
  album: {
    id: string;
  };
};

const ExploreGrid = ({ recentTrackIds }: ExploreGridProps) => {
  async function getTracks() {
    const allTracks: TrackProps[] = [];
    let popularity = maxPopularity;

    if (recentTrackIds) {
      while (
        _.uniqBy([...tracks, ...allTracks], 'album.id').length <
        tracks.length + 9
      ) {
        const returnedTracks = await useRequest({
          endpoint: `recommendations?seed_tracks=${recentTrackIds}&max_popularity=${popularity}`,
        }).then((res) => {
          return res.tracks;
        });

        const newTracks = returnedTracks.filter(
          (returnedTrack: TrackProps) =>
            allTracks.findIndex(
              (track: TrackProps) => track.album.id === returnedTrack.album.id,
            ) === -1 &&
            tracks.findIndex(
              (track: TrackProps) => track.album.id === returnedTrack.album.id,
            ),
        );

        if (newTracks.length === 0) {
          popularity < 100 ? (popularity += 10) : setEndReached(true);
        } else {
          allTracks.push(...newTracks);
        }
      }

      setTracks(_.uniqBy([...tracks, ...allTracks], 'album.id').slice(0, tracks.length + 9));
      setIsLoading(false);
      setMaxPopularity(popularity);
    }
  }

  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPopularity, setMaxPopularity] = useState(20);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    if (recentTrackIds) {
      getTracks();
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
          next={() => getTracks()}
          hasMore={!endReached}
          loader={
            <ImageList cols={3} rowHeight={'auto'} gap={3}>
              {[1, 2, 3].map((_a, i) => (
                <div key={i} className={styles.exploreGridTile}>
                  <Skeleton
                    key={i}
                    variant="rect"
                    className={styles.tileSkeleton}
                  />
                </div>
              ))}
            </ImageList>
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
          style={{ overflow: 'hidden' }}
        >
          <ImageList cols={3} rowHeight={'auto'} gap={3}>
            {!isLoading
              ? tracks.map((track: TrackProps) => (
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
