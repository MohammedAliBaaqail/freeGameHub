import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComments } from "../../app/commentsSlice";
import { addGameRating } from "../../app/gamesSlice";
import ReactStars from "react-rating-stars-component";

export const CommentForm = ({ gameId }) => {
  const [text, setText] = useState();
  const [rating, setRating] = useState();

  const [user, setUser] = useState();
  const [error, setError] = useState();
  const { cmnt } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const game = gameId;
    
    const comment = { text, game, user, rating };
    const gameRate = { gameId, rating };
    const res = await fetch("/game/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.msg);
    }
    if (res.ok) {
      setText("");
      setUser("");
      setError("");
      setRating(0);
      dispatch(addComments(json));
        // dispatch(addGameRating(gameId,rating));

    }
    const ratingRes = await fetch("/games", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify( gameRate),
        headers: {
          "Content-type": "application/json",
        },
      });
      
      const ratingJson = await ratingRes.json();
      
      if (!ratingRes.ok) {
        setError(ratingJson.msg);
      }
      if (ratingRes.ok) {

          dispatch(addGameRating(ratingJson));
  
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
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label>User</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
        <div className="rating-starts">Rating: {rating} 
        <ReactStars  {...reactStarsPrompt} />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
