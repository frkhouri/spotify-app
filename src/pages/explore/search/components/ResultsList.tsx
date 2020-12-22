import React from "react";
import { List } from "@material-ui/core";
import { history } from "umi";

import ItemList from "@/pages/components/ItemList";

type ResultsListProps = {
  results: any;
};

const ResultsList = ({ results }: ResultsListProps) => {
  return (
    <List component="nav">
      {results &&
        results.map((result: object) => (
          <ItemList
            item={result}
            imageUrl={
              result.type == "track"
                ? result.album.images[0]?.url
                : result.images[0]?.url
            }
            action={() => history.push(`/${result.type}s/${result.id}`)}
          />
        ))}
    </List>
  );
};

export default ResultsList;
