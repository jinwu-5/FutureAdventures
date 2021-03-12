import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
  Link,
} from "@material-ui/core";
import useStyles from "./styles";
import CommentIcon from "@material-ui/icons/Comment";
import moment from "moment";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostLikeButton from "../LikeButton/LikeButton";
import { StoreContext } from "../../store/store";
import OptionButton from "../OptionButton/OptionButton";

const PostCard = ({
  post: {
    id,
    imageUrl,
    title,
    content,
    dateCreated,
    username,
    postLikes,
    postLikeCount,
    commentCount,
  },
}) => {
  const { user } = useContext(StoreContext);
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
          <OptionButton user={user} post={{ id, username }} />
        </IconButton>
      </CardContent>
      <CardActions disableSpacing>
        <PostLikeButton user={user} post={{ id, postLikes, postLikeCount }} />
        <Typography variant="body2" color="textSecondary">
          {postLikeCount}
        </Typography>
        <IconButton
          href={`/posts/${id}`}
          className={classes.comment}
          component={Link}
        >
          <CommentIcon color="disabled" />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
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
