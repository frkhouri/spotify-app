import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Typography } from '@material-ui/core';

import GenrePlaylist from './components/GenrePlaylist';
import TallCards from './components/TallCards';
import MediumCards from '../../components/MediumCards';
import useRequest from '@/utils/useRequest';
import styles from './styles.less';

const HomePage = () => {
  async function getArtists() {
    await useRequest({
      endpoint: 'me/top/artists?time_range=short_term',
    }).then((res) => {
      setArtists(res?.items);
      setArtistsLoading(false);

      let artistGenres: string[] = [];
      res?.items.forEach((artist: {genres: string[]}) => {
        artistGenres.push(...artist.genres);
      });
      artistGenres = _.uniq(artistGenres);
      setGenres(_.sampleSize(artistGenres, 5));
      setGenresLoading(false);
    });

    return;
  }

  async function getAlbums() {
    await useRequest({
      endpoint: 'me/top/tracks?limit=10&time_range=short_term',
    }).then((res) => {
      const trackAlbums = _.uniqBy(res.items, 'album.id');

      setAlbums(trackAlbums);
      setAlbumsLoading(false);
    });

    return;
  }

  const [artistsLoading, setArtistsLoading] = useState(true);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [genresLoading, setGenresLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getArtists();
    getAlbums();
  }, []);

  return (
    <>
      <Typography variant="h6" className={styles.listHeading}>
        Your favourite artists
      </Typography>
      <TallCards items={artists} isLoading={artistsLoading} />
      <Typography variant="h6" className={styles.listHeading}>
        Recommended Albums
      </Typography>
      <MediumCards items={albums} isLoading={albumsLoading} />
      <Typography variant="h6" className={styles.listHeading}>
        Playlists
      </Typography>
      {!genresLoading && genres.map((genre) => (
        <GenrePlaylist genre={genre} />
      ))}
      <div style={{height: '85px'}}></div>
    </>
  );
};

export default HomePage;
