import React from "react";

import SmallCard from "./SmallCard";
import SmallCardSkeleton from "./SmallCardSkeleton";
import ListHeading from "./ListHeading";
import SmallSquareCard from "./SmallSquareCard";

type SmallCardListProps = {
  items: any;
  heading: string;
  size: string;
};

const SmallCardList = ({ items, heading, size }: SmallCardListProps) => {
  return (
    <>
      <ListHeading heading={heading} />
      <div style={{ padding: "15px", whiteSpace: "nowrap", overflow: "auto" }}>
        {size == "tall"
          ? items?.length > 0
            ? items.map((item: object) => (
                <SmallCard item={item} key={item.id} />
              ))
            : [1, 2].map(() => <SmallCardSkeleton />)
          : size == "small"
          ? items?.length > 0
            ? items.map((item: object) => (
                <SmallSquareCard item={item} key={item.id} />
              ))
            : [1, 2].map(() => <SmallCardSkeleton />)
          : items?.length > 0
          ? items.map((item: object) => (
              <SmallSquareCard item={item} key={item.id} />
            ))
          : [1, 2].map(() => <SmallCardSkeleton />)}
      </div>
    </>
  );
};

export default SmallCardList;
