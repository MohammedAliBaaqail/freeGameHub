import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const logIn = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("free-game-hub.netlify.app/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify( email, password ),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error);
        setIsLoading(false);
        return;
      }

      const json = await res.json();

      if (!json.isVerified) {
        setError("Your email is not verified. Please check your email for instructions.");
        setIsLoading(false);
        return;
      }

      dispatch(login(json));
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setError("Internal server error");
      setIsLoading(false);
    }
  };

  return { logIn, isLoading, error };
};
