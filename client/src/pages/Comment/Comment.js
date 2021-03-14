import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import GET_POST from "../../graphql/GetPost";
import {
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";
import { StoreContext } from "../../store/store";
import PostLikeButton from "../../components/LikeButton/LikeButton";

function CommentPage(props) {
  const classes = useStyles();

  const postId = props.match.params.postId;

  const { user } = useContext(StoreContext);

  const { loading, data: { getPost } = {} } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  let postAndComment;
  if (loading) {
    postAndComment = <CircularProgress />;
  } else {
    const {
      id,
      content,
      title,
      dateCreated,
      username,
      imageUrl,
      postLikes,
      postLikeCount,
      comments,
    } = getPost;

    postAndComment = (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.title}
            >
              {title}
            </Typography>
            <CardMedia
              className={classes.media}
              image={
                imageUrl ||
                "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHF1ZXN0aW9ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              }
            />

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {content}
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
            <CardActions>
              <PostLikeButton
                user={user}
                post={{ id, postLikes, postLikeCount }}
              />
              <Typography variant="body2" color="textSecondary">
                {postLikeCount}
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
        {comments.map((comment) => (
          <Card className={classes.root} key={comment.id}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
              className={classes.username}
            >
              {comment.username}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
              className={classes.date}
            >
              {moment(comment.createdAt).fromNow()}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
              className={classes.commentContent}
            >
              {comment.content}
            </Typography>
          </Card>
        ))}
      </div>
    );
  }

  return postAndComment;
}

export default CommentPage;
