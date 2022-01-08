import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';

import useRequest from '@/utils/useRequest';
import ImageHeader from '@/components/ImageHeader';
// import CardGrid from '@/components/CardGrid';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    useRequest({
      endpoint: `browse/categories/${categoryId}?country=from_token`,
    }).then((response) => setCategory(response));
    useRequest({
      endpoint: `browse/categories/${categoryId}/playlists?country=from_token`,
    }).then((response) => setPlaylists(response.playlists.items));
  }, []);

  return (
    <>
      {category.icons && (
        <ImageHeader item={category} imageUrl={category.icons[0].url} />
      )}
      {/* <CardGrid items={playlists} /> */}
      <p style={{ textAlign: 'center' }}>Under Construction</p>
    </>
  );
};

export default CategoryPage;
