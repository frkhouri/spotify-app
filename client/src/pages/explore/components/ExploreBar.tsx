import React, { useEffect, useState } from 'react';
import { AppBar, Chip, InputBase, Toolbar } from '@material-ui/core';
import { history } from 'umi';

import useRequest from '@/utils/useRequest';
import styles from '../styles.less';

type ExploreBarProps = {};

const ExploreBar = ({}: ExploreBarProps) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    useRequest({
      endpoint: 'browse/categories?country=from_token',
    }).then((response) => setCategories(response.categories.items));
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
            onFocus={() => history.push('/explore/search')}
            className={styles.searchField}
          />
        </div>
        <div className={styles.chipsWrapper}>
          {categories.map((category) => (
            <Chip
              key={category.name}
              label={category.name}
              variant="outlined"
              size="small"
              className={styles.categoryChip}
              onClick={() => history.push(`/categories/${category.id}`)}
            />
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ExploreBar;
