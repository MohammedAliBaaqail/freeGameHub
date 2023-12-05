import { useState } from "react"
import {  useSelector } from "react-redux";

import { Loading } from "../../components/loading/Loading"
import './Signup.scss';
import { useSignup } from "../../hooks/useSignup";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const {signup, error, isLoading} = useSignup()


const {user} = useSelector((state) => state.user);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await signup( {email,username, password} );
  };

  return (
    <div className="signup ">  
    <form className="bg-container" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <Input type={"text"} onChange={(e) => setUsername(e.target.value)} value={username} name={"Username"} />
      {/* <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      /> */}

      <Input type={"email"} onChange={(e) => setEmail(e.target.value)} value={email} name={"Email"} />
      {/* <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /> */}
 

      <Input type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} name={"Password"} />
      {/* <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      /> */}

      {isLoading? <div className="loading-favourite"><div className="loading-ring"><div></div><div></div><div></div><div></div></div>  </div> : <Button text={"Sign up"} disabled={isLoading} ></Button>}
      
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Signup