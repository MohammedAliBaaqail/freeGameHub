import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import {
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,

} from "../../services/commentsApi";
import { Button } from "../button/Button";
import CommentForm from "../commentForm/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import formatRelative from "date-fns/formatRelative";
import addDays from "date-fns/addDays";
import "./F2PGameComments.scss";
import {
  setComments,
  patchComment,
  deleteComment,
} from "../../app/commentsSlice";

export const F2PGameComments = ({ gameId }) => {
  const { data: commentsList ,isLoading } = useGetCommentsQuery(gameId);
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editedComment, setEditedComment] = useState();
  const [editMode, setEditMode] = useState(false);
  const { cmnt } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState();
  // const { games } = useSelector((state) => state.games);
  // const [avrageRating, setAvrageRating] = useState();
  // const [updateError, setUpdateError] = useState();
  // const [deleteError, setDeleteError] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchComments = async () => {
      // const res = await fetch(`https://freegamehub-backend.onrender.com/game/comments/${gameId}`);
      // const data = await res.json();
     
      if (!isLoading) {
        dispatch(setComments(commentsList));
       
      }
      if (user) {
        setEditMode(true);
      }
    };

    fetchComments();
  }, [isLoading,user]);
  
  // eslint-disable-next-line

  const handleEdit = async (_id, editedComment) => {
    // const res = await fetch(`http://localhost:4000/game/comments/${_id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({ text: editedComment }),
    // });
    // const json = await res.json();
    // if (!res.ok) {
    //   console.log(json.error);
    // }
    // if (res.ok) {
    //   dispatch(patchComment(json));
    //   console.log(json);
    // }

    const newComment = JSON.stringify({ text: editedComment });
    const res = await updateComment({_id, newComment} )
    console.log(res)
    if (res.error) {
      console.log("error", res.error.data.error)
      setError(res.error.data.error);
    
    }
    if (!res.error) {
      console.log("no error", res.data);

      dispatch(patchComment(res.data));
    }

  };

  const handleDelete = async (_id) => {
    const res = await fetch(`https://freegamehub-backend.onrender.com/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();
    if (!res.ok) {
      console.log(json.error);
    }
    if (res.ok) {
      console.log(json._id)
      dispatch(deleteComment(json._id));
    }

    // const res = await deleteComment(_id);
  
    // if (res.error) {
    //   console.log("error", res.error.data.error)
    //   setError(res.error.data.error);
    
    // }
    // if (!res.error) {
    //   console.log("no error", res);

    //   dispatch(deleteComment(res.data));
    // }





  };

  const reactStarsPrompt = {
    size: 40,
    isHalf: true,
    edit: false,
    activeColor: "#ed8a27",
  };
  if (isLoading) return<div className="loading-comments">Loading Comments...<div className="lds-ring"><div></div><div></div><div></div><div></div></div>  </div>;
  // calculate average rating
  var allRating = 0;
  cmnt.map((comment) => (allRating += comment.rating));
  var averageRating = allRating / cmnt.length;

  
  return (
    <div className="comments-component">
      <div className="comments-form">
        {averageRating ? (
          <h1>Game Rating: {Math.round(averageRating * 10) / 10}</h1>
        ) : (
          <h1>No Game Rating Yet</h1>
        )}
        {/* <h1>Game Rating: {Math.round(averageRating * 10) / 10}</h1> */}
        <div className="rating-stars">
          {averageRating ? (
            <ReactStars value={averageRating} {...reactStarsPrompt} />
          ) : (
            ""
          )}
        </div>
        {user ? (
          <CommentForm gameId={gameId} authUser={user} />
        ) : (
          <div>
           
            <Link className=" auth" to="/login">
              <Button text="login" not_blank={true} />
            </Link>
            <span>  OR  </span>
            <Link className=" auth" to="/signup">
              <Button text="signup" not_blank={true} />
            </Link>
            <span>   to leave a comment </span>
          </div>
        )}
      </div>
      <div className="line"> </div>
      {cmnt?.map((comment) => (
        <div className="bg-container" key={comment._id}>
          <h3>Comment : {comment.text}</h3>

          
          {editMode? ( comment.username === user.username ? (
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          ) : (
            ""
          )) : ''}

          {editMode?(comment.username === user.username ? (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setEditedComment(e.target.value);
                }}
              />
              <button onClick={() => handleEdit(comment._id, editedComment)}>
                Edit
              </button>
            </>
          ) : (
            ""
          )) : ''}

          <h3>
            comment by: <span className="color-orange">{comment.username}</span>
          </h3>
          <h4>
            {formatRelative(
              addDays(new Date(comment.createdAt), -6),
              new Date()
            )}
          </h4>
          <div className="rating-stars">
            Rate: {comment.rating}
            <ReactStars value={comment.rating} {...reactStarsPrompt} />
          </div>
        </div>
      ))}
    </div>
  );
};