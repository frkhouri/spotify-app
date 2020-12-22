import React from "react";
import { List, ListSubheader, Paper, Typography } from "@material-ui/core";
import { history } from "umi";

import styles from "../../styles.less";
//import CustomTabs from '@/pages/components/CustomTabs';
//import ResultsList from './ResultsList';
import ItemList from "@/pages/components/ItemList";

type SearchResultsProps = {
  results: any;
};

const SearchResults = React.forwardRef(
  ({ results }: SearchResultsProps, ref) => {
    /*const tabNames = ['Artists', 'Albums', 'Tracks', 'Playlists'];
    const tabContents = [
        results.artists && <ResultsList results={results.artists.items} />,
        results.albums && <ResultsList results={results.albums.items} />,
        results.tracks && <ResultsList results={results.tracks.items} />,
        results.playlists && <ResultsList results={results.playlists.items} />
    ];*/

    return (
      <Paper
        variant="outlined"
        square
        className={styles.searchResultsWrapper}
        ref={ref}
      >
        {results.artists ? (
          <List style={{ maxHeight: "calc(100vh - 66px)", overflow: "auto" }}>
            <ListSubheader disableSticky>Artists</ListSubheader>
            {results.artists.items.map((artist: object) => (
              <ItemList
                item={artist}
                imageUrl={artist.images[0]?.url}
                action={() => history.push(`/artists/${artist.id}`)}
              />
            ))}
            <ListSubheader disableSticky>Albums</ListSubheader>
            {results.albums.items.map((album: object) => (
              <ItemList
                item={album}
                imageUrl={album.images[0]?.url}
                action={() => history.push(`/albums/${album.id}`)}
              />
            ))}
            <ListSubheader disableSticky>Tracks</ListSubheader>
            {results.tracks.items.map((track: object) => (
              <ItemList
                item={track}
                imageUrl={track.album.images[0]?.url}
                action={() => history.push(`/albums/${track.album.id}`)}
              />
            ))}
            <ListSubheader disableSticky>Playlists</ListSubheader>
            {results.playlists.items.map((playlist: object) => (
              <ItemList
                item={playlist}
                imageUrl={playlist.images[0]?.url}
                action={() => history.push(`/playlists/${playlist.id}`)}
              />
            ))}
          </List>
        ) : (
          <Typography variant="h6" align="center" style={{ marginTop: "10vh" }}>
            Search for something
          </Typography>
        )}
      </Paper>
    );
  }
);

export default SearchResults;
