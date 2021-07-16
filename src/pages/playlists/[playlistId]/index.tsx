import React, { useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import { useParams } from 'umi';

import ApiRequest from '@/utils/request';
import CustomTabs from '@/pages/components/CustomTabs';
import ImageHeader from '@/pages/components/ImageHeader';
import ItemList from '@/pages/components/ItemList';
import ShuffleButton from '@/pages/components/ShuffleButton';

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState({});
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  const tabNames = ['Tracks', 'Recommended'];
  const tabContents = [
    <List component="nav">
      <ShuffleButton body={{ context_uri: playlist.uri }} />
      {playlist.tracks &&
        playlist.tracks.items.map((track: object) => (
          <ItemList
            item={track.track}
            imageUrl={track.track.album?.images[0]?.url}
            artists={track.track.artists}
          />
        ))}
    </List>,
    <List component="nav">
      <ShuffleButton
        body={{ uris: recommendedTracks.map(track => track.uri) }}
      />
      {recommendedTracks.length > 0 &&
        recommendedTracks.map((track: object) => (
          <ItemList
            item={track}
            imageUrl={track.album.images[0].url}
            artists={track.artists}
          />
        ))}
    </List>,
  ];

  const selectSample = (playlist: Array<object>) => {
    const sampleTracks = [];

    if (playlist.tracks.items.length < 5) {
      sampleTracks.push(...playlist.tracks.items);
    } else {
      while (sampleTracks.length < 5) {
        const track =
          playlist.tracks.items[
            Math.floor(Math.random() * playlist.tracks.items.length)
          ];
        if (!sampleTracks.includes(track)) {
          sampleTracks.push(track);
        }
      }
    }

    return sampleTracks.map((track: object) => track.track.id).join(',');
  };

  useEffect(() => {
    if (!playlist.tracks) {
      ApiRequest({
        endpoint: `/playlists/${playlistId}`,
      }).then(response => setPlaylist(response));
    } else {
      const sampleTracks = selectSample(playlist);
      ApiRequest({
        endpoint: '/recommendations?seed_tracks=' + sampleTracks,
      }).then(response => setRecommendedTracks(response.tracks));
    }
  }, [playlist.tracks]);

  return (
    <>
      {playlist.images && (
        <>
          <ImageHeader item={playlist} imageUrl={playlist.images[0].url} />
          <List component="nav">
            <ShuffleButton body={{ context_uri: playlist.uri }} />
            {playlist.tracks &&
              playlist.tracks.items.map((track: object) => (
                <ItemList
                  item={track.track}
                  imageUrl={track.track.album?.images[0]?.url}
                  artists={track.track.artists}
                />
              ))}
          </List>
        </>
      )}
    </>
  );
};

export default PlaylistPage;
