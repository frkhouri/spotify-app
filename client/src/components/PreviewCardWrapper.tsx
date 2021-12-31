import React from "react";
import { Backdrop, Popover } from "@material-ui/core";

import PreviewCard from "./PreviewCard";

type PreviewCardWrapperProps = {
  anchorEl: any;
  setAnchorEl: any;
  item: object;
};

const PreviewCardWrapper = ({
  anchorEl,
  setAnchorEl,
  item
}: PreviewCardWrapperProps) => {
  return (
    <Backdrop open={Boolean(anchorEl)} style={{ zIndex: 1300 }}>
      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: window.innerHeight * 0.5,
          left: window.innerWidth * 0.5
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        PaperProps={{ style: { width: "100%" } }}
      >
        <PreviewCard track={item} />
      </Popover>
    </Backdrop>
  );
};

export default PreviewCardWrapper;
