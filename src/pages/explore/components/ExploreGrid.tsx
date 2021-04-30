import React, { useEffect, useState } from "react";
import { GridList, GridListTile } from "@material-ui/core";

import ApiRequest from "@/utils/request";
import ListHeading from "@/pages/components/ListHeading";
import OneLineGridTile from "./OneLineGridTile";

type ExploreGridProps = {
  recentTrackIds: string;
};

const ExploreGrid = ({ recentTrackIds }: ExploreGridProps) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    recentTrackIds &&
      ApiRequest({
        endpoint: `/recommendations?seed_tracks=${recentTrackIds}&max_popularity=40&limit=9`
      }).then(response => setTracks(response.tracks));
  }, [recentTrackIds]);

  return (
    <>
      <ListHeading heading="Discover something new" />
      <GridList
        cols={3}
        cellHeight="auto"
        style={{ padding: "10px 25px", width: "100%" }}
      >
        {tracks.length > 0 &&
          tracks.map((track: object) => (
            <GridListTile key={track.id} cols={1}>
              <OneLineGridTile track={track} />
            </GridListTile>
          ))}
      </GridList>
    </>
  );
};

export default ExploreGrid;
