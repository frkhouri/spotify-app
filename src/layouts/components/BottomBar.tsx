import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { history, useLocation } from "umi";

import styles from "../styles.less";

const TopBar = () => {
  const [value, setValue] = useState(
    useLocation().pathname.substring(1) || "home"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };

  return (
    <Paper className={styles.bottomNav}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="home" icon={<HomeIcon />} />
        <BottomNavigationAction value="explore" icon={<ExploreIcon />} />
        <BottomNavigationAction value="new" icon={<NewReleasesIcon />} />
        <BottomNavigationAction value="users/me" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default TopBar;
