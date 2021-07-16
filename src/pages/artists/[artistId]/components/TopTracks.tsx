import React, { useState } from 'react';
import { List } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ApiRequest from '@/utils/request';
import Play from '@/utils/play';
import ItemList from '@/pages/components/ItemList';
import ListHeading from '@/pages/components/ListHeading';
import styles from '../styles.less';

type TopTracksProps = {
  tracks: Array<object>;
};

const TopTracks = ({ tracks }: TopTracksProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const playTopTracks = (item: object) => {
    const trackUris = tracks.map(track => track.uri);
    const body = {
      uris: trackUris,
      offset: {
        uri: item.uri,
      },
    };

    ApiRequest({
      endpoint: '/me/player/shuffle?state=false',
      method: 'put',
    });

    Play(body);
  };

  return (
    <>
      <ListHeading heading="Top Tracks" />
      <List>
        {tracks &&
          tracks
            .slice(0, 5)
            .map((track: object, index: number) => (
              <ItemList
                item={track}
                imageUrl={track.album.images[0].url}
                number={index + 1}
                action={playTopTracks}
              />
            ))}
        <Accordion
          expanded={expanded}
          onChange={handleChange('panel')}
          className={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={styles.accordionTitle}
          >
            <Typography>{expanded ? 'Show Less' : 'Show More'}</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            {tracks &&
              tracks
                .slice(5)
                .map((track: object, index: number) => (
                  <ItemList
                    item={track}
                    imageUrl={track.album.images[0].url}
                    number={index + 6}
                    action={playTopTracks}
                  />
                ))}
          </AccordionDetails>
        </Accordion>
      </List>
    </>
  );
};

export default TopTracks;
