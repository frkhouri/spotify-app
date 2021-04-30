import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

import ApiRequest from '@/utils/request';
import ImageHeader from '@/pages/components/ImageHeader';
import CustomTabs from '@/pages/components/CustomTabs';
import CardGrid from '@/pages/components/CardGrid';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({});
    const [playlists, setPlaylists] = useState([]);

    const content = [
        <CardGrid items={playlists} />
    ];

    useEffect(() => {
            ApiRequest({
                endpoint: `/browse/categories/${categoryId}?country=from_token`
            })
                .then(response => setCategory(response));
            ApiRequest({
                endpoint: `/browse/categories/${categoryId}/playlists?country=from_token`
            })
                .then(response => setPlaylists(response.playlists.items));
    }, []);

    return (
        <>
            {category.icons &&
                <ImageHeader item={category} imageUrl={category.icons[0].url} />
            }
            <CustomTabs tabNames={['Playlists']} tabContents={content} />
        </>
    );
};

export default CategoryPage;