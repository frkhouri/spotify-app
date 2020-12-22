import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { request } from "umi";

type PreviewCardMenuProps = {
  track: {
    id: string;
    name: string;
    uri: string;
  };
  open: any;
  setOpen: any;
};

const PreviewCardMenu = ({ track, open, setOpen }: PreviewCardMenuProps) => {
  const addToQueue = () => {
    request(`/me/player/queue?uri=${track.uri}`, {
      method: "post"
    }).then(setOpen(null));
  };

  return (
    <Menu
      id="preview-card-menu"
      anchorEl={open}
      open={Boolean(open)}
      onClose={() => setOpen(null)}
    >
      <MenuItem onClick={() => setOpen(null)}>Add to playlist</MenuItem>
      <MenuItem onClick={() => addToQueue()}>Add to queue</MenuItem>
    </Menu>
  );
};

export default PreviewCardMenu;
