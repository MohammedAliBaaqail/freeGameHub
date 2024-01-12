import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComments } from "../../app/commentsSlice";
import { useAddCommentMutation } from "../../services/commentsApi";
import ReactStars from "react-rating-stars-component";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import "./CommentForm.scss";

export const CommentForm = ({ gameId, authUser }) => {
  const [text, setText] = useState();
  const [rating, setRating] = useState();
  const [addComment] = useAddCommentMutation();

  const [error, setError] = useState();
  const [emptyFields, setEmptyFields] = useState([]);

  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.user.user);



  const game = gameId;
  const token = authUser.token;
  const comment = {
    text,
    game,
    username,
    rating,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { comment, token };
    const res = await addComment(newComment);
    if (res.error) {
      console.log("error", res.error.data.error);
      setError(res.error.data.error);
      setEmptyFields(res.error.data.emptyFields);
    }
    if (!res.error) {
      console.log("no error", res.data);
      setText("");

      setError("");
      setRating(0);
      setEmptyFields([]);
      dispatch(addComments(res.data));
    }

    //   if (res.error ) {
    //     setError(res.error.data.error);
    //     setEmptyFields(res.error.data.emptyFields)

    //   }

    //   if (!res.error ) {
    //     console.log("ggrgrgr",res.data)
    //     setText("");

    //     setError("");
    //     setRating(0);
    //     setEmptyFields([])
    //     dispatch(addComments(res.data));

    // };
  };

  const reactStarsPrompt = {
    size: 40,
    isHalf: true,
    activeColor: "#ed8a27",
    onChange: (newValue) => {
      setRating(newValue);
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          className={emptyFields?.includes("text") ? "input-error" : ""}
          type={"text"}
          value={text}
          isTextArea={true}
          onChange={(e) => setText(e.target.value)}
          name={"leave a comment"}
        />
           <button className="btn-23" type="submit">
        Submit
      </button>
      {error && <p>{error + emptyFields}</p>}
      </form>
      <div
        className={
          emptyFields?.includes("rating")
            ? "input-error game-rating-stars"
            : "game-rating-stars"
        }
      >
        Rate: {rating}
        <ReactStars {...reactStarsPrompt} />
      </div>
   
    </div>
  );
};

export default CommentForm;
