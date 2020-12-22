import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { request } from "umi";

import CardGrid from "@/pages/components/CardGrid";
import SmallCardList from "@/pages/components/SmallCardList";
import ExploreBar from "./components/ExploreBar";
import OneLineGridList from "./components/OneLineGridList";
import ListHeading from "../components/ListHeading";
import ExploreGrid from "./components/ExploreGrid";

const ExplorePage = () => {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentTrackIds, setRecentTrackIds] = useState("");
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [loadingFeaturedPlaylists, setLoadingFeaturedPlaylists] = useState(
    true
  );

  const playAll = tracks => {
    const uris = [];
    tracks.map((track: object) => uris.push(track.uri));

    request("/me/player/shuffle?state=false", {
      method: "put"
    });

    request("/me/player/play", {
      method: "put",
      data: {
        uris: uris
      }
    });
  };

  useEffect(() => {
    if (loadingRecent) {
      request("/me/player/recently-played?limit=5").then(response => {
        setRecentTrackIds(
          response.items.map((item: object) => item.track.id).join(",")
        );
      });
      //.catch(error => history.push('/login'));
      setLoadingRecent(false);
    }

    if (recentTrackIds) {
      request(
        `/recommendations?seed_tracks=${recentTrackIds}&min_popularity=20`
      ).then(response => setRecommendedTracks(response.tracks));
    }

    if (loadingFeaturedPlaylists) {
      request("/browse/featured-playlists?country=CA&limit=5").then(response =>
        setFeaturedPlaylists(response?.playlists.items)
      );
      setLoadingFeaturedPlaylists(false);
    }
  }, [recentTrackIds]);

  return (
    <>
      <ExploreBar />
      <div style={{ paddingTop: "90px" }}>
        <SmallCardList
          items={recommendedTracks}
          heading="Based on your recent listening"
        />
        <Button
          style={{ marginLeft: "30px", marginTop: "-15px" }}
          onClick={() => playAll(recommendedTracks)}
        >
          PLAY ALL
        </Button>
        <ListHeading heading="Featured" />
        {featuredPlaylists.map(playlist => (
          <OneLineGridList item={playlist} />
        ))}
        <ExploreGrid recentTrackIds={recentTrackIds} />
      </div>
    </>
  );
};

export default ExplorePage;