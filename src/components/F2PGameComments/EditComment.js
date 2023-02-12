
import "./F2PGameComments.scss";
import { useState } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import {

    useUpdateCommentMutation,
    useDeleteCommentMutation,
  
  } from "../../services/commentsApi";
  import {
 
    patchComment,
    removeComment,
  } from "../../app/commentsSlice";

  import { useDispatch, useSelector } from "react-redux";

export const EditComment = ({comment , editMode , authUser}) => {
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

  const [editedComment, setEditedComment] = useState();
  const [editing, setEditing] = useState('');

  const [hiddenClass, setHiddenClass] = useState(true);
  const { cmnt } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const handleToggleHiddenClass = () => {
    setHiddenClass(!hiddenClass);
  };
  if (!authUser) return <h3 className={!hiddenClass ? " hide" : ""}> {comment.text}</h3>
  const token = authUser.token;
  const handleEdit = async (_id, editedComment ) => {


    const newComment = JSON.stringify({ text: editedComment });
    const res = await updateComment({ _id, newComment , token });
    console.log(res);
    if (res.error) {
      console.log("error", res.error.data.error);
      setError(res.error.data.error);
    }
    if (!res.error) {
      console.log("no error", res.data);

      dispatch(patchComment(res.data));
      setHiddenClass(true);
    }
  };
  const handleDelete = async (_id) => {
    // const res = await fetch(`https://freegamehub-backend.onrender.com/game/comments/${_id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // const json = await res.json();
    // if (!res.ok) {
    //   console.log(json.error);
    // }
    // if (res.ok) {
    //   console.log(json._id)
    //   dispatch(deleteComment(_id));
    // }

    const res = await deleteComment({_id, token});
  
    if (res.error) {
      console.log("error", res.error.data.error)
      setError(res.error.data.error);
    
    }
    if (!res.error) {
      console.log("no error", res.data);

      dispatch(removeComment(res.data));
    }




  };

  return (
    <>
     <h3 className={!hiddenClass ? " hide" : ""}> {comment.text}</h3>
          {editMode?(comment.username === user.username ? (
            <>
                  <div className={hiddenClass ? "edit-comment hide" : "edit-comment"}>
        <Input
          type={"text"}
          defaultValue={comment.text}
          name={"Comment"}
          onChange={(e) => setEditedComment(e.target.value)}
        />
        <div className="comment-buttons">
        <button
          className="btn-23"
          onClick={() => handleEdit(comment._id, editedComment)}
        >
          Submit
        </button>
        <button className="btn-23" onClick={() => handleDelete(comment._id)}>
          Delete
        </button>
        </div>
      </div>
            <Button
        notAnchor={true}
        text={"Edit"}
        handleClick={handleToggleHiddenClass}
      />


            </>
           
          ) : 
            ""
          ) : ''}
    
      
    </>
  );
};
