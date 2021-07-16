import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ApiRequest from '@/utils/request';
import SmallCardList from '../../../components/SmallCardList';

type ArtistAlbumsProps = {
  album: {
    id: string;
    name: string;
    artist: {
      id: string;
      name: string;
    };
  };
  artists: Array<{
    id: string;
    name: string;
  }>;
};

const ArtistAlbums = ({ album, artists }: ArtistAlbumsProps) => {
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    if (album && artists) {
      const returnedArtistAlbums = [];

      artists.forEach((artist: object, index: number) => {
        ApiRequest({
          endpoint: `/artists/${artist.id}/albums?country=from_token&limit=50&include_groups=album`,
        }).then(response => {
          var arr = [];
          response.items.reduce((_, item) => {
            let exists = !!arr.find(x => x.name === item.name);
            if (!exists) {
              arr.push(item);
            }
          }, response.items[0]);
          returnedArtistAlbums.push(arr);
          setArtistAlbums(returnedArtistAlbums);
        });
      });
    }
  }, [album, artists]);

  return (
    <>
      {artistAlbums?.length == album.artists?.length && (
        <>
          {artists.map((artist: object, index: number) => (
            <Accordion variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Avatar src={artist.images[0].url} />
                <Typography style={{ marginLeft: '15px', alignSelf: 'center' }}>
                  {artist.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SmallCardList items={artistAlbums[index]} size={'small'} />
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </>
  );
};

export default ArtistAlbums;
