import React, { useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import { request, useParams } from 'umi';

import CustomTabs from '@/pages/components/CustomTabs';
import ImageHeader from '@/pages/components/ImageHeader';
import ItemList from '@/pages/components/ItemList';
import ShuffleButton from '@/pages/components/ShuffleButton';

const RadioPage = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState({});
    const [tracks, setTracks] = useState([]);

    const tabNames = ['Tracks'];
    const tabContents = [
        <List component='nav'>
            {tracks.length > 0 &&
                <>
                    <ShuffleButton body={{ 'uris': tracks.map(track => track.uri) }} />
                    {tracks.map((track: object) => (
                        <ItemList item={track} imageUrl={track.album.images[0].url} artists={track.artists} />
                    ))}
                </>
            }
        </List>
    ];

    useEffect(() => {
        !artist.id ? (
            request(`/artists/${artistId}`)
                .then(response => setArtist(response))
        ) : (
            request(`/recommendations?seed_artists=${artist.id}&limit=50`)
                .then(response => setTracks(response.tracks))
        );
    }, [artist]);

    return (
        <>
        {artist.images &&
            <>
                <ImageHeader item={{...artist, name: artist.name + ' Radio' }} imageUrl={artist.images[0].url} />
                <CustomTabs tabNames={tabNames} tabContents={tabContents} />
            </>
        }
        </>
    );
};

export default RadioPage;