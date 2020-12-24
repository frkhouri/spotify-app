import React, { useEffect, useState } from "react";
import { request } from "umi";

import SmallCardList from "../components/SmallCardList";
import GenreCardList from "./components/GenreCardList";

const HomePage = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    topArtists.length == 0 &&
      request("/me/top/artists?limit=10&time_range=short_term").then(
        (response: any) => {
          const genres = [];
          const sampleGenres = [];

          setTopArtists(response.items);
          response.items.map((artist: any) => {
            artist.genres.forEach((genre: string) => {
              if (!genres.includes(genre)) {
                genres.push(genre);
              }
            });
          });
          while (sampleGenres.length < 5) {
            const genre = genres[Math.floor(Math.random() * genres.length)];
            if (!sampleGenres.includes(genre)) {
              sampleGenres.push(genre);
            }
          }
          setTopGenres(sampleGenres);
        }
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
      {topGenres.map(genre => (
        <GenreCardList genre={genre} />
      ))}
    </>
  );
};

export default HomePage;
