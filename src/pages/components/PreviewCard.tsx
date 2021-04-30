import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton
} from "@material-ui/core";
import AlbumIcon from "@material-ui/icons/Album";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { history } from "umi";

import ApiRequest from "@/utils/request";
import Blank from "@/assets/blank.png";
import ReactPlayer from "react-player";
import PreviewCardMenu from "./PreviewCardMenu";

type PreviewCardProps = {
  track: {
    id: string;
    name: string;
    preview_url?: string;
    uri: string;
    album: {
      id: string;
      images: Array<object>;
    };
    artists: Array<{
      id: string;
      name: string;
    }>;
  };
};

const PreviewCard = ({ track }: PreviewCardProps) => {
  const [liked, setLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);

  useEffect(() => {
    ApiRequest({
      endpoint: `/me/tracks/contains?ids=${track.id}`
    }).then(response => setLiked(response[0]));
  }, []);

  return (
    <Card style={{ width: "100%" }}>
      <CardHeader
        title={track.name}
        subheader={track.artists.map(artist => artist.name).join(", ")}
        titleTypographyProps={{ variant: "subtitle2" }}
        subheaderTypographyProps={{ variant: "caption" }}
        style={{ padding: "8px 16px" }}
      />
      <CardMedia>
        <ReactPlayer
          playing={true}
          url={track.preview_url}
          width={"100%"}
          config={{
            file: {
              attributes: {
                poster: Blank
              }
            }
          }}
          style={{
            background: `url(${track.album.images[0]?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <PlayArrowIcon
          style={{ position: "absolute", right: "10px", bottom: "74px" }}
        />
      </CardMedia>
      <CardActions disableSpacing style={{ justifyContent: "space-around" }}>
        <IconButton aria-label="like song">
          {liked ? (
            <FavoriteIcon htmlColor="#e53935" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton
          aria-label="artist"
          onClick={() => history.push(`/artists/${track.artists[0].id}`)}
        >
          <PersonOutlineIcon />
        </IconButton>
        <IconButton
          aria-label="album"
          onClick={() => history.push(`/albums/${track.album.id}`)}
        >
          <AlbumIcon />
        </IconButton>
        <IconButton aria-label="more">
          <MoreVertIcon onClick={event => setMenuOpen(event.currentTarget)} />
          <PreviewCardMenu
            track={track}
            open={menuOpen}
            setOpen={setMenuOpen}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PreviewCard;
