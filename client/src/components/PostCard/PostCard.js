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
    imageUrl,
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
          imageUrl ||
          "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHF1ZXN0aW9ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
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
