import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import GET_POST from "../../graphql/GetPost";
import CREATE_COMMENT from "../../graphql/CreateComment";
import {
  CircularProgress,
  Typography,
  Card,
  TextField,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";
import { StoreContext } from "../../store/store";
import PostLikeButton from "../../components/LikeButton/PostLikeButton";
import CommentLikeButton from "../../components/LikeButton/CommentLikeButton";
import OptionButton from "../../components/OptionButton/OptionButton";
import DeleteCommentButton from "../../components/OptionButton/DeleteComment";
import { useMutation } from "@apollo/client";

function CommentPage(props) {
  const classes = useStyles();

  const postId = props.match.params.postId;

  const { user } = useContext(StoreContext);

  const { loading, data: { getPost } = {} } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT);

  const handleCommentSubmit = async (event) => {
    try {
      await createComment({
        variables: { postId, content: comment },
      });
    } catch (error) {
      console.error(error);
    }
  };

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
              <IconButton aria-label="settings">
                <OptionButton
                  user={user}
                  post={{ id, username }}
                  className={classes.optionButton}
                />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
        {user && (
          <Card className={classes.root}>
            <form>
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Post a comment"
                  name="comment"
                  required
                  fullWidth
                  autoFocus
                  onChange={(event) => setComment(event.target.value)}
                  value={comment}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={comment.trim() === ""}
                  onClick={handleCommentSubmit}
                  className={classes.submitButton}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        )}
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
              {moment(comment.dateCreated).fromNow()}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
              className={classes.commentContent}
            >
              {comment.content}
            </Typography>
            <CommentLikeButton
              user={user}
              postId={id}
              commentId={comment.id}
              comment={comment}
            />
            <Typography variant="body2" color="textSecondary">
              {comment.commentLikeCount}
            </Typography>
            <IconButton aria-label="settings">
              {user && (
                <DeleteCommentButton postId={id} commentId={comment.id} />
              )}
            </IconButton>
          </Card>
        ))}
      </div>
    );
  }

  return postAndComment;
}

export default CommentPage;
