
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice"



export const useSignup = () => {



      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState('')
    
      const dispatch = useDispatch();



      const signup = async ( email,username, password  ) => {
        setIsLoading(true)
        setError(null)
        const res = await fetch("https://freegamehub-backend.onrender.com/user/signup", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify( email,username , password ),
         
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
      
    
    
      return { signup, isLoading, error }
   
    




}
