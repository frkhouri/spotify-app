import React, { useEffect, useState } from "react";

import ApiRequest from "@/utils/request";
import CardGrid from "@/pages/components/CardGrid";

const ExplorePage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    ApiRequest({
      endpoint: "/browse/new-releases?country=CA"
    }).then(response => setAlbums(response.albums.items));
  }, []);

  return (
    <>
      <CardGrid items={albums} heading="New Releases" />
    </>
  );
};

export default ExplorePage;
