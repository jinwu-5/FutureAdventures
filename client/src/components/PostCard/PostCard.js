import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import CommentIcon from "@material-ui/icons/Comment";
import moment from "moment";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const PostCard = ({
  post: {
    selectedFile,
    title,
    content,
    dateCreated,
    username,
    postLikeCount,
    commentCount,
  },
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          selectedFile ||
          "https://images.unsplash.com/photo-1610337673044-720471f83677?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80"
        }
        title="place holder"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          className={classes.title}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          component="h2"
          className={classes.username}
        >
          {username}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h2"
          className={classes.date}
        >
          {moment(dateCreated).fromNow()}
        </Typography>
        <IconButton aria-label="settings" className={classes.overlay}>
          <MoreVertIcon />
        </IconButton>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {postLikeCount}
        </Typography>
        <IconButton aria-label="comment" className={classes.comment}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          {commentCount}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.content}
          >
            {content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
