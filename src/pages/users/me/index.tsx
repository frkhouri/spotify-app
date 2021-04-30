import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import ApiRequest from "@/utils/request";
import CustomTabs from "@/pages/components/CustomTabs";
import CardGrid from "@/pages/components/CardGrid";
import UserHeader from "../components/UserHeader";
import styles from "../styles.less";

const MePage = () => {
  const [user, setUser] = useState({});
  const [playlists, setPlaylists] = useState([]);

  const tabNames = ["Playlists", "Artists", "Albums"];
  const tabContents = [<CardGrid items={playlists} />, "artists", "albums"];

  useEffect(() => {
    ApiRequest({
      endpoint: "/me"
    }).then(response => setUser(response));

    ApiRequest({
      endpoint: "/me/playlists?limit=50"
    }).then(response => setPlaylists(response.items));

    /*ApiRequest({
      endpoint: '/me/following?type=artist'
    })
            .then(response => console.log(response));*/
  }, []);

  return (
    <>
      {user.display_name && (
        <>
          <AppBar elevation={0} color="white" className={styles.userBar}>
            <Toolbar>
              <Typography variant="h6">{user.display_name}</Typography>
            </Toolbar>
          </AppBar>
          <UserHeader user={user} />
        </>
      )}
      <CustomTabs tabNames={tabNames} tabContents={tabContents} />
    </>
  );
};

export default MePage;
