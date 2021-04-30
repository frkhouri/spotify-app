import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

import ApiRequest from '@/utils/request';
import ImageHeader from '@/pages/components/ImageHeader';
import CustomTabs from '@/pages/components/CustomTabs';
import TopTracks from './components/TopTracks';
import CardGrid from '@/pages/components/CardGrid';
import ShuffleButton from '@/pages/components/ShuffleButton';

const ArtistPage = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState({});
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [thisIsPlaylist, setThisIsPlaylist] = useState({});
    const [radio, setRadio] = useState({});

    const tabNames = ['Overview', 'Albums', 'Related'];
    const tabContents = [
        <>
            <ShuffleButton body={{ 'context_uri': artist.uri }} />
            <CardGrid items={[thisIsPlaylist, radio]} heading='Featured on' />
            <TopTracks tracks={topTracks} />
        </>,
        <CardGrid items={albums} />,
        'page 3'
    ];

    useEffect(() => {
        !artist.name ? (
            ApiRequest({
                endpoint: `/artists/${artistId}`
            })
                .then(response => setArtist(response)),

            ApiRequest({
                endpoint: `/artists/${artistId}/top-tracks?country=from_token`
            })
                .then(response => setTopTracks(response.tracks)),

            ApiRequest({
                endpoint: `/artists/${artistId}/albums?country=from_token&limit=50&include_groups=album`
            })
                .then(response => {
                    var arr = [];
                    response.items.reduce((_, item) => {
                        let exists = !!arr.find(x => x.name === item.name);
                        if(!exists){
                            arr.push(item);
                        }
                        setAlbums(arr);
                    }, response.items[0])
                })
        ) : (
            ApiRequest({
                endpoint: `/search?q=this%20is%20${artist.name}&type=playlist&limit=1`
            })
                .then(response => {
                    if (response.playlists.items[0].owner.id == 'spotify' && response.playlists.items[0].name == `This Is ${artist.name}`) {
                        setThisIsPlaylist(response.playlists.items[0]);
                    }
                }),

            setRadio({
                id: artist.id,
                name: artist.name + ' Radio',
                images: artist.images,
                type: 'radio',
            })
        )

        
    }, [artist]);

    return (
        <>
            {artist.images &&
                <>
                    <ImageHeader item={artist} imageUrl={artist.images[0].url} />
                    <CustomTabs tabNames={tabNames} tabContents={tabContents} />
                </>
            }
        </>
    );
};

export default ArtistPage;