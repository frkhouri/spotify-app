import React from "react";
import { Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

import SmallSquareCard from "./SmallSquareCard";
import ListHeading from "./ListHeading";

type CardGridProps = {
  items: any;
  heading?: string;
};

const CardGrid = ({ items, heading }: CardGridProps) => {
  return (
    <>
      {heading && <ListHeading heading={heading} />}
      <Grid container spacing={2} style={{ width: "100%" }}>
        {items.map(
          (item: object) =>
            item.name && (
              <Grid item xs={6}>
                <SmallSquareCard item={item} />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
};

export default CardGrid;
