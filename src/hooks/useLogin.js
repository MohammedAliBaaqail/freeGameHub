
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice"



export const useLogin = () => {



      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState('')
    
      const dispatch = useDispatch();



      const logIn = async ( email, password ) => {
        setIsLoading(true)
        setError(null)
        const res = await fetch("https://free-game-hub-backend.vercel.app/user/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify( email, password ),
         
          });
          const json = await res.json();
          if (!res.ok) {
            setError(json.error);
            setIsLoading(false);
            
          }
          if (res.ok) {
            
            dispatch(login(json));
            setIsLoading(false);
          }

      }
      
    
    
      return { logIn, isLoading, error }
   
    




}
