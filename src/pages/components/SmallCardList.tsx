import React from "react";

import SmallCard from "./SmallCard";
import SmallCardSkeleton from "./SmallCardSkeleton";
import ListHeading from "./ListHeading";

type SmallCardListProps = {
  items: any;
  heading: string;
};

const SmallCardList = ({ items, heading }: SmallCardListProps) => {
  return (
    <>
      <ListHeading heading={heading} />
      <div style={{ padding: "15px", whiteSpace: "nowrap", overflow: "auto" }}>
        {items?.length > 0
          ? items.map((item: object) => <SmallCard item={item} key={item.id} />)
          : [1, 2].map(() => <SmallCardSkeleton />)}
      </div>
    </>
  );
};

export default SmallCardList;
