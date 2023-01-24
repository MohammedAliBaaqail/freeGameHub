import { useState, useEffect, React } from "react";
import CommentForm from "../commentForm/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import formatRelative  from 'date-fns/formatRelative';
import addDays from 'date-fns/addDays'
import "./F2PGameComments.scss";
import {
  setComments,
  patchComment,
  deleteComment,
} from "../../app/commentsSlice";


export const F2PGameComments = ({ gameId }) => {
  const [editedComment, setEditedComment] = useState();
  const { cmnt } = useSelector((state) => state.comments);
  // const { games } = useSelector((state) => state.games);
  // const [avrageRating, setAvrageRating] = useState();
  // const [updateError, setUpdateError] = useState();
  // const [deleteError, setDeleteError] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("/game/comments");
      const data = await res.json();
      if (res.ok) {
        
        dispatch(setComments(data));
      }
    };

    fetchComments();
  }, [dispatch]);
  
// eslint-disable-next-line
  const filteredComments = cmnt.filter((comment) => comment.game == gameId);

  const handleEdit = async (_id, editedComment) => {
    const res = await fetch(`/game/comments/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text: editedComment }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.log(json.error);
    }
    if (res.ok) {
      dispatch(patchComment(json));
    }
  };

  const handleDelete = async (_id) => {
    const res = await fetch(`/game/comments/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    if (!res.ok) {
      
      console.log(json.error)
    }
    if (res.ok) {
      dispatch(deleteComment(json));
    }
  };

  const reactStarsPrompt = {
    size: 40,
    isHalf: true,
    edit: false,
    activeColor: "#ed8a27",
  };

  var allRating = 0;
  filteredComments.map((comment) => (allRating += comment.rating));
  var averageRating = allRating / filteredComments.length;
  console.log(averageRating)
  return (
    <div>
      <h1>Game Rating: {Math.round(averageRating * 10) / 10}</h1>
      <div className="rating-stars">
        {averageRating? <ReactStars value={averageRating} {...reactStarsPrompt}  /> : '' }
      
      </div>
      <CommentForm gameId={gameId} allRating={allRating} />
      
      {filteredComments?.map((comment) => (
        <div key={comment._id}>
          <h3>Comment : {comment.text}</h3>

          <button onClick={() => handleDelete(comment._id)}>Delete</button>

          <input
            type="text"
            onChange={(e) => {
              setEditedComment(e.target.value);
            }}
          />
          <button onClick={() => handleEdit(comment._id, editedComment)}>
            Edit
          </button>

          <h3>username: {comment.user}</h3>
          <h4>{formatRelative(addDays(new Date(comment.createdAt), -6), new Date())}</h4>
          <div className="rating-stars">
            Rate: {comment.rating}
            <ReactStars value={comment.rating} {...reactStarsPrompt} />
          </div>

          <p>
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </p>
        </div>
      ))}
    </div>
  );
};
