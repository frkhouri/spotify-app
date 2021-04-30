import React, { useState } from "react";
import { Grid, InputBase } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { history } from "umi";

import ApiRequest from "@/utils/request";
import styles from "../../styles.less";
import SearchResults from "./SearchResults";

const Search = () => {
  const [timer, setTimer] = useState(null);
  const [results, setResults] = useState([]);

  const search = (query: string) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        query &&
          ApiRequest({
            endpoint: `/search?q=${query}&type=album,artist,playlist,track&limit=5`
          }).then(response => setResults(response));
      }, 300)
    );
  };

  return (
    <>
      <Grid container alignItems="center" justify="space-between" spacing={3}>
        <Grid item xs={1}>
          <ArrowBackIcon htmlColor="black" onClick={() => history.goBack()} />
        </Grid>
        <Grid item xs={11}>
          <InputBase
            id="search"
            placeholder="Search"
            type="search"
            fullWidth
            onChange={event => search(event.target.value)}
            autoFocus
            className={styles.searchField}
          />
        </Grid>
      </Grid>
      <SearchResults results={results} />
    </>
  );
};

export default Search;
