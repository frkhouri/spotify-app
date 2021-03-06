import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  List,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from 'umi';

import ApiRequest from '@/utils/request';
import ImageHeader from '@/pages/components/ImageHeader';
import CustomTabs from '@/pages/components/CustomTabs';
import ItemList from '@/pages/components/ItemList';
import ShuffleButton from '@/pages/components/ShuffleButton';
import ArtistAlbums from './components/ArtistAlbums';
import SmallCardList from '../../components/SmallCardList';

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState({});
  const [artists, setArtists] = useState([]);
  //const [artistAlbums, setArtistAlbums] = useState([]);
  const [loadingAlbum, setLoadingAlbum] = useState(true);
  //const [loadingArtistAlbums, setLoadingArtistAlbums] = useState(true);

  const tabNames = [
    'Tracks',
    artists?.length > 1 ? 'Artists' : artists[0]?.name,
  ];

  const tabContents = [
    <List component="nav">
      <ShuffleButton body={{ context_uri: album.uri }} />
      {!loadingAlbum &&
        album.tracks.items.map((track: object) => (
          <ItemList
            item={track}
            number={track.track_number}
            artists={track.artists}
          />
        ))}
    </List>,
    <ArtistAlbums album={album} artists={artists} />,
  ];

  useEffect(() => {
    const returnedArtists = [];

    !album.id
      ? ApiRequest({
          endpoint: `/albums/${albumId}`,
        })
          .then(response => setAlbum(response))
          .finally(() => setLoadingAlbum(false))
      : album.artists.forEach((artist: object) => {
          ApiRequest({
            endpoint: `/artists/${artist.id}`,
          }).then(response => {
            returnedArtists.push(response);
            returnedArtists.length == album.artists.length &&
              setArtists(returnedArtists);
          });
        });
  }, [album]);

  return (
    <>
      {album.id && artists[0] && (
        <>
          <ImageHeader item={album} imageUrl={album.images[0].url} />
          <List component="nav">
            <ShuffleButton body={{ context_uri: album.uri }} />
            {!loadingAlbum &&
              album.tracks.items.map((track: object) => (
                <ItemList
                  item={track}
                  number={track.track_number}
                  artists={track.artists}
                />
              ))}
            <ArtistAlbums album={album} artists={artists} />
          </List>
        </>
      )}
    </>
  );
};

export default AlbumPage;
