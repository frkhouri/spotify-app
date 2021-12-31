import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { history } from 'umi';

import SmallCards from '@/components/SmallCards';
import play from '@/utils/play';
import useRequest from '@/utils/useRequest';
import styles from '../styles.less';

type GenrePlaylistProps = {
  genre: string;
};

type PlaylistProps = {
  id: string;
  name: string;
  type: string;
  uri: string;
};

const GenrePlaylist = ({ genre }: GenrePlaylistProps) => {
  async function getPlaylist(genre: string) {
    await useRequest({
      endpoint: `search?q="the%20sound%20of%20${genre}"&type=playlist&limit=1`,
    }).then((response: any) => {
      if (
        response.playlists.items[0]?.owner.id == 'thesoundsofspotify' &&
        response.playlists.items[0]?.name.toLowerCase() ==
          `the sound of ${genre.toLowerCase()}`
      ) {
        setPlaylist(response.playlists.items[0]);
        setPlaylistLoading(false);
      } else {
        setPlaylistLoading(false);
        setTracksLoading(false);
      }
    });

    return;
  }

  async function getPlaylistTracks(playlist: PlaylistProps) {
    await useRequest({
      endpoint: `playlists/${playlist.id}/tracks?limit=10`,
    }).then((response) => {
      setPlaylistTracks(response.items);
      setTracksLoading(false);
    });
  }

  async function shuffle() {
    playlist && play({ context: playlist.uri, shuffle: true });
  }

  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [playlist, setPlaylist] = useState<PlaylistProps>();
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    if (genre) {
      playlistLoading ? getPlaylist(genre) : getPlaylistTracks(playlist);
    }
  }, [genre, playlist]);

  return (
    <>
      {!playlistLoading ? (
        playlist && (
          <>
            <div className={styles.playlistHeader}>
              <Button onClick={() => history.push(`/playlists/${playlist.id}`)}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  style={{ textTransform: 'none' }}
                >
                  {playlist.name}
                </Typography>
              </Button>
              <Button onClick={() => shuffle()}>SHUFFLE</Button>
            </div>
          </>
        )
      ) : (
        <div className={styles.playlistHeaderSkeleton}>
          <Skeleton variant="rect" width={175} height={36.5} />
          <Skeleton variant="rect" width={75} height={36.5} />
        </div>
      )}
      <SmallCards items={playlistTracks} isLoading={tracksLoading} />
    </>
  );
};

export default GenrePlaylist;
