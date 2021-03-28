import React, { useContext } from "react";
import { StoreContext } from "../../store/store";
import { useStyles, theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import moment from "moment";
import clsx from "clsx";
import OptionButton from "../OptionButton/OptionButton";
import CommentIcon from "@material-ui/icons/Comment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostLikeButton from "../LikeButton/PostLikeButton";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
} from "@material-ui/core";

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

  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={
            imageUrl ||
            "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cXVlc3Rpb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
          }
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            className={classes.title}
          >
            {title.length > 20 ? title.substring(0, 20) + " ..." : title}
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

          <IconButton href={`/posts/${id}`} className={classes.comment}>
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
    </ThemeProvider>
  );
};

export default PostCard;
