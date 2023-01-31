import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { addComments } from "../../app/commentsSlice";

import ReactStars from "react-rating-stars-component";

export const CommentForm = ({ gameId , authUser}) => {
  const [text, setText] = useState();
  const [rating, setRating] = useState();


  const [error, setError] = useState();
  const [emptyFields, setEmptyFields] = useState([])


  const dispatch = useDispatch();
  const  {username}  = useSelector((state) => state.user.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const game = gameId;

    const comment = { text, game,username,  rating };
  
    const res = await fetch("/game/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authUser.token}`
      },
      body: JSON.stringify(comment),
   
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (res.ok) {
      setText("");

      setError("");
      setRating(0);
      setEmptyFields([])
      dispatch(addComments(json));
    }
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
      <h1>Comment Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <input className={emptyFields.includes('text') ? 'input-error' : ''}  
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

  
        <button type="submit">Submit</button>
        {error && <p>{error + emptyFields }</p>}
        <div className={emptyFields.includes('rating') ? 'input-error rating-stars' : 'rating-stars'} >
          Rate: {rating}
          <ReactStars {...reactStarsPrompt} />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
