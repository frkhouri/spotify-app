import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

import ExploreBar from './components/ExploreBar';
import MediumCards from '@/components/MediumCards';
import ExploreGrid from './components/ExploreGrid';
import play from '@/utils/play';
import useRequest from '@/utils/useRequest';
import styles from './styles.less';

const ExplorePage = () => {
  async function playAll(tracks: Array<{ uri: string }>) {
    const uris = tracks.map((track: { uri: string }) => {
      return track.uri;
    });

    play({ tracks: uris, shuffle: false, offset: { position: 0 } });

    return;
  }

  async function getRecentTracks() {
    useRequest({
      endpoint: 'me/player/recently-played?limit=5',
    }).then((response) => {
      setRecentTrackIds(
        response.items
          .map((item: { track: { id: string } }) => {
            return item.track.id;
          })
          .join(','),
      );
      setLoadingRecent(false);
    });

    return;
  }

  async function getRecommendedTracks() {
    useRequest({
      endpoint: `recommendations?seed_tracks=${recentTrackIds}`,
    }).then((response) => {
      setRecommendedTracks(response.tracks);
      setLoadingRecommended(false);
    });

    return;
  }

  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentTrackIds, setRecentTrackIds] = useState('');
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [recommendedTracks, setRecommendedTracks] = useState([]);


  useEffect(() => {
    loadingRecent ? getRecentTracks() : getRecommendedTracks();
  }, [loadingRecent]);

  return (
    <>
      <ExploreBar />
      <div className={styles.explorePage}>
        <Typography variant="h6" className={styles.heading}>
          Based on your recent listening
        </Typography>
        <MediumCards items={recommendedTracks} isLoading={loadingRecommended} />
        <Button
          style={{ marginLeft: '30px', marginTop: '-15px' }}
          onClick={() => playAll(recommendedTracks)}
        >
          PLAY ALL
        </Button>
        <ExploreGrid recentTrackIds={recentTrackIds} />
      </div>
    </>
  );
};

export default ExplorePage;
