import { useState } from "react"
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
    <form className="login box" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login