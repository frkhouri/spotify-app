import React, { useEffect, useState } from "react";
import { request } from "umi";
import SmallCardList from "../components/SmallCardList";
import CardGrid from "../components/CardGrid";

const HomePage = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    request("/me/top/artists?limit=10&time_range=short_term").then(response =>
      setTopArtists(response.items)
    );

    request("/me/top/tracks?limit=10&time_range=short_term").then(response => {
      const trackAlbums = [];
      response.items.map((track: any) => {
        if (
          trackAlbums.find((album: any) => {
            return album.id == track.album.id;
          }) == undefined
        ) {
          trackAlbums.push(track.album);
        }
      });
      setTopAlbums(trackAlbums);
    });
  }, []);

  return (
    <>
      <SmallCardList
        items={topArtists}
        heading="Your favourite artists"
        size="tall"
      />
      <SmallCardList items={topAlbums} heading="Recommended" size="small" />
    </>
  );
};

export default HomePage;
