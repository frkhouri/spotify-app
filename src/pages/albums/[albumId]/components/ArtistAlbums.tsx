import React, { useEffect, useState } from 'react';
import { List } from '@material-ui/core';
import { history, request } from 'umi';

import ItemList from '@/pages/components/ItemList';

type ArtistAlbumsProps = {
    album: {
        id: string;
        name: string;
        artist: {
            id: string;
            name: string;
        };
    };
    artists: Array<{
        id: string;
        name: string;
    }>
};

const ArtistAlbums = ({ album, artists }: ArtistAlbumsProps) => {
    const [artistAlbums, setArtistAlbums] = useState([]);

    useEffect(() => {
        if (album && artists) {
            const returnedArtistAlbums = [];

            artists.forEach((artist: object, index: number) => {
                request(`/artists/${artist.id}/albums?country=from_token&limit=50&include_groups=album`)
                    .then(response => {
                        var arr = [];
                        response.items.reduce((_, item) => {
                            let exists = !!arr.find(x => x.name === item.name);
                            if(!exists){
                                arr.push(item);
                            }
                        }, response.items[0])
                        returnedArtistAlbums.push(arr);
                        setArtistAlbums(returnedArtistAlbums);
                    })
            })
        }
    }, [album, artists]);

    return (
        <>
            {artistAlbums?.length == album.artists?.length &&
                <List component='nav'>
                    {artists.map((artist: object, index: number) => (
                        <>
                            <ItemList item={artist} imageUrl={artist.images[0].url} action={() => history.push(`/artists/${artist.id}`)} />
                            {artistAlbums[index].map((album: object) => <ItemList item={album} imageUrl={album.images[0].url} action={() => history.push(`/albums/${album.id}`)} />)}
                        </>
                    ))}
                </List>
            }
        </>
    );
};

export default ArtistAlbums;