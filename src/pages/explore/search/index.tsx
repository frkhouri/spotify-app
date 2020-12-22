import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import styles from "../styles.less";
import Search from "./components/Search";

const ExplorePage = () => {
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar disableGutters className={styles.exploreBar}>
          <div className={styles.searchWrapper}>
            <Search />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ExplorePage;
