import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import CommentIcon from "@material-ui/icons/Comment";
import moment from "moment";

const PostCard = ({
  post: {
    selectedFile,
    content,
    dateCreated,
    username,
    postLikeCount,
    commentCount,
  },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardMedia
        className={classes.media}
        image={selectedFile}
        title="place holder"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {postLikeCount}
        </Typography>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {commentCount}
        </Typography>
        <Typography
          className={classes.date}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {moment(dateCreated).fromNow()}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
