import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Divider, Typography } from '@material-ui/core';
import { useParams } from 'umi';

import ImageHeader from '@/components/ImageHeader';
import TopTracks from './components/TopTracks';
import MediumCards from '@/components/MediumCards';
import useRequest from '@/utils/useRequest';
import styles from './styles.less';

const ArtistPage = () => {
  async function getArtist() {
    useRequest({
      endpoint: `artists/${artistId}`,
    }).then((res) => setArtist(res));

    useRequest({
      endpoint: `artists/${artistId}/top-tracks?country=from_token`,
    }).then((res) => setTopTracks(res.tracks)),
      useRequest({
        endpoint: `artists/${artistId}/albums?country=from_token&limit=50&include_groups=album`,
      }).then((res) => {
        setAlbums(_.uniqBy(res.items, 'name'));
      });
  }

  const { artistId } = useParams();
  const [artist, setArtist] = useState({});
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [thisIsPlaylist, setThisIsPlaylist] = useState({});
  const [radio, setRadio] = useState({});

  useEffect(() => {
    artistId && getArtist();
  }, [artistId]);

  return (
    <>
      {artist.images && (
        <>
          <ImageHeader item={artist} imageUrl={artist.images[0].url} />
          <TopTracks tracks={topTracks} />
          <Divider />
          <Typography variant="h6" className={styles.heading}>
            Discography
          </Typography>
          <MediumCards items={albums} />
        </>
      )}
    </>
  );
};

export default ArtistPage;
