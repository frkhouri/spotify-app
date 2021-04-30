import React, { useEffect, useState } from "react";
import { AppBar, InputBase, Toolbar } from "@material-ui/core";
import { history } from "umi";

import apiRequest from "@/utils/request";
import styles from "../styles.less";
import CategoryChip from "./CategoryChip";

type ExploreBarProps = {};

const ExploreBar = ({}: ExploreBarProps) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiRequest({
      endpoint: "/browse/categories?country=from_token"
    }).then(response => setCategories(response.categories.items));
  }, []);

  return (
    <AppBar elevation={0}>
      <Toolbar disableGutters className={styles.exploreBar}>
        <div className={styles.searchWrapper}>
          <InputBase
            id="search"
            placeholder="Search"
            type="search"
            fullWidth
            onFocus={() => history.push("/explore/search")}
            className={styles.searchField}
          />
        </div>
        <div className={styles.chipsWrapper}>
          {categories.map(category => (
            <CategoryChip category={category} />
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ExploreBar;
