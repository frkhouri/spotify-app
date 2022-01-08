import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import { history } from 'umi';

import MediumCards from '@/components/MediumCards';
import useRequest from '@/utils/useRequest';
import styles from '../styles.less';

type ArtistAlbumsProps = {
  albumArtists: [
    {
      artists: Array<ArtistProps>;
    },
  ];
  albumId: string;
};

type ArtistProps = {
  id: string;
  name: string;
  images: [
    {
      url: string;
    },
  ];
};

type AlbumProps = {
  id: string;
  images: [
    {
      url: string;
    },
  ];
};

const ArtistAlbums = ({ albumArtists, albumId }: ArtistAlbumsProps) => {
  async function getArtistAlbums(artists: [ArtistProps]) {
    Promise.all(
      artists.map((artist: ArtistProps) => {
        return useRequest({
          endpoint: `artists/${artist.id}/albums?country=from_token&limit=50&include_groups=album`,
        });
      }),
    ).then((allAlbums) => {
      let albums = allAlbums
        .map((artist) => _.uniqBy(artist.items, 'name'))
        .map((artist) =>
          artist.filter((album: AlbumProps) => album.id !== albumId),
        );

      setArtistAlbums(albums);
      setIsLoading(false);
    });
  }

  const [artistAlbums, setArtistAlbums] = useState<Array<ArtistAlbumsProps>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (albumArtists.length) {
      getArtistAlbums(albumArtists);
    }
  }, [albumArtists]);

  return (
    <>
      {albumArtists &&
        albumArtists.map((artist: ArtistProps, index: number) => (
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Avatar
                src={artist.images[0].url}
                onClick={() => history.replace(`../artists/${artist.id}`)}
              />
              <Typography style={{ marginLeft: '15px', alignSelf: 'center' }}>
                {artist.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.artistAlbumsWrapper}>
              {!!artistAlbums[index]?.length && (
                <MediumCards
                  items={artistAlbums[index]}
                  isLoading={isLoading}
                />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default ArtistAlbums;
