import React, { useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import { useParams } from 'umi';

import ApiRequest from '@/utils/request';
import CustomTabs from '@/pages/components/CustomTabs';
import ImageHeader from '@/pages/components/ImageHeader';
import ItemList from '@/pages/components/ItemList';
import ShuffleButton from '@/pages/components/ShuffleButton';

const RadioPage = () => {
    const { type } = useParams();
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [tracks, setTracks] = useState([]);

    const selectSample = (playlist: Array<object>) => {
        const sampleTracks = [];

        if (playlist.tracks.items.length < 5) {
            sampleTracks.push(...playlist.tracks.items);
        } else {
            while (sampleTracks.length < 5) {
                const track = playlist.tracks.items[Math.floor(Math.random()*playlist.tracks.items.length)];
                if (!sampleTracks.includes(track)) {
                    sampleTracks.push(track);
                }
            }
        };

        return sampleTracks.map((track: object) => track.id ? track.id : track.track.id).join(',');
    };

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
        if (!item.id) {
            ApiRequest({
                endpoint: `/${type}s/${id}`
            })
                .then(response => setItem(response))
         } else {
            if (type == "artist") {
                ApiRequest({
                    endpoint: `/recommendations?seed_artists=${item.id}&limit=50`
                })
                    .then(response => setTracks(response.tracks))
            } else {
                const sampleTracks = selectSample(item);
                ApiRequest({
                    endpoint: '/recommendations?seed_tracks=' + sampleTracks
                })
                    .then(response => setTracks(response.tracks));
            }
                
        }
    }, [item]);

    return (
        <>
        {item.images &&
            <>
                <ImageHeader item={{...item, name: item.name + ' Radio' }} imageUrl={item.images[0].url} />
                <CustomTabs tabNames={tabNames} tabContents={tabContents} />
            </>
        }
        </>
    );
};

export default RadioPage;