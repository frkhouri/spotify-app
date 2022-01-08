import React, { useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import { useParams } from 'umi';

import useRequest from '@/utils/useRequest';
import ImageHeader from '@/components/ImageHeader';
import ItemList from '@/components/ItemList';
import ArtistAlbums from './components/ArtistAlbums';

type TrackProps = {
  id: string;
  name: string;
  track_number: number;
  artists: [{ object: ArtistProps }];
};

type ArtistProps = {
  id: string;
  name: string;
};

type AlbumProps = {
  id: string;
  tracks: {
    items: [
      {
        object: TrackProps;
      },
    ];
  };
  images: [
    {
      url: string;
    },
  ];
};

const AlbumPage = () => {
  async function getAlbum() {
    const album = await useRequest({
      endpoint: `albums/${albumId}`,
    }).then((res) => {
      setAlbum(res);
      return res;
    });

    await Promise.all(
      album.artists.map((artist: ArtistProps) => {
        return useRequest({
          endpoint: `artists/${artist.id}`,
        });
      }),
    ).then((albumArtists: Array<ArtistProps>) => {
      setArtists(albumArtists);
      setLoadingAlbum(false);
    });
  }

  const { albumId } = useParams();
  const [album, setAlbum] = useState<AlbumProps>();
  const [artists, setArtists] = useState<Array<ArtistProps>>([]);
  const [loadingAlbum, setLoadingAlbum] = useState(true);

  useEffect(() => {
    albumId && getAlbum();
  }, [albumId]);

  return (
    <>
      {album && (
        <>
          <ImageHeader item={album} imageUrl={album.images[0].url} />
          <List component="nav">
            {!loadingAlbum &&
              album.tracks.items.map((track: TrackProps) => (
                <ItemList
                  key={track.id}
                  item={track}
                  number={track.track_number}
                  artists={track.artists}
                />
              ))}
            {!!artists.length && (
              <ArtistAlbums albumArtists={artists} albumId={album.id} />
            )}
          </List>
        </>
      )}
    </>
  );
};

export default AlbumPage;
