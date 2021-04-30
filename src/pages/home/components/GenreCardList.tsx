import React, { useEffect, useState } from "react";

import ApiRequest from "@/utils/request";
import OneLineGridList from "../../explore/components/OneLineGridList";

type GenreCardListProps = {
  genre: string;
};

const GenreCardList = ({ genre }: GenreCardListProps) => {
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    genre &&
      ApiRequest({
        endpoint: `/search?q="the%20sound%20of%20${genre}"&type=playlist&limit=1`
      }).then((response: any) => {
        if (
          response.playlists.items[0].owner.id == "thesoundsofspotify" &&
          response.playlists.items[0].name.toLowerCase() ==
            `the sound of ${genre.toLowerCase()}`
        ) {
          setPlaylist(response.playlists.items[0]);
        }
      });
  }, [genre]);

  return <>{playlist && <OneLineGridList item={playlist} />}</>;
};

export default GenreCardList;
