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

} from "../../app/commentsSlice";
import { Input } from "../input/Input";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { EditComment } from "./EditComment";

export const F2PGameComments = ({ gameId }) => {
  const { data: commentsList ,isLoading } = useGetCommentsQuery(gameId);
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editedComment, setEditedComment] = useState();
  const [editMode, setEditMode] = useState(false);
  const [hiddenClass, setHiddenClass] = useState(true);
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
      // const res = await fetch(`https://free-game-hub-backend.vercel.app/game/comments/${gameId}`);
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

  



  const reactStarsPrompt = {
    size: 25,
    isHalf: true,
    edit: false,
    activeColor: "#ed8a27",
  };
  const gameReactStarsPrompt = {
    size: 40,
    isHalf: true,
    edit: false,
    activeColor: "#ed8a27",
  };
  if (isLoading) return<div className="loading-comments"><h3>Loading comments... ( This may take awhile )</h3><div className="lds-ring"><div></div><div></div><div></div><div></div></div>  </div>;
  // calculate average rating
  var allRating = 0;
  cmnt?.map((comment) => (allRating += comment.rating));
  var averageRating = allRating / cmnt?.length;

  
  return (
    <div className="comments-component">
      <div className="comments-form">
        {averageRating ? (
          <h1>Game Rating: {Math.round(averageRating * 10) / 10}</h1>
        ) : (
          <h1>No Game Rating Yet</h1>
        )}
        {/* <h1>Game Rating: {Math.round(averageRating * 10) / 10}</h1> */}
        <div className="game-rating-stars">
          {averageRating ? (
            <ReactStars value={averageRating} {...gameReactStarsPrompt} />
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
    
      {cmnt?.map((comment) => (
        <div className="bg-container comment-info" key={comment._id}>
                    <div className="comment-user">
          <h3 >
            <span className="color-orange">{comment.username } </span>
          </h3>
          <h4 className="comment-date">
          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          
          </h4>
          </div>
          <div className="rating-stars">
            {/* Rate: {comment.rating} */}
            <ReactStars value={comment.rating} {...reactStarsPrompt} />
          </div>
          {/* <h3>Comment : {comment.text}</h3> */}


          
          {/* {editMode? ( comment.username === user.username ? (
           
          ) : (
            ""
          )) : ''} */}

         <EditComment comment={comment} editMode={editMode} authUser={user} /> 
            
     

        
        </div>
      ))}
    </div>
  );
};