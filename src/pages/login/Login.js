import { useState } from "react"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { useLogin } from "../../hooks/useLogin"
import './Login.scss'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {logIn, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("email", email)
    await logIn({email, password})
  }

  return (
    <div className="login">
    <form className="bg-container" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
  
      <Input type={"email"}  onChange={(e) => setEmail(e.target.value)} value={email} name={"Email"}  />
      {/* <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /> */}

      <Input type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} name={"password"} />
      {/* <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      /> */}

      <Button text={"Login"} disabled={isLoading}></Button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Login