import { useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../components/loading/Loading";
import './Signup.scss';
import { useSignup } from "../../hooks/useSignup";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const { user } = useSelector((state) => state.user);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false); // New state for password mismatch

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmed password match
    if (password !== confirmPassword) {
      // Handle password mismatch
      console.error("Password and confirmed password do not match");
      setPasswordMismatch(true);
      setSignupSuccess(false);
      return;
    } else {
      setPasswordMismatch(false);
    }

    try {
      await signup({ email, username, password });
      setSignupSuccess(true);
    } catch (error) {
      console.error(error);
      setSignupSuccess(false);
    }
  };

  return (
    <div className="signup ">
      <form className="bg-container" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <Input type={"text"} onChange={(e) => setUsername(e.target.value)} value={username} name={"Username"} />
        <Input type={"email"} onChange={(e) => setEmail(e.target.value)} value={email} name={"Email"} />
        <Input type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} name={"Password"} />
        <Input type={"password"} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name={"Confirm Password"} />

       

        {isLoading ? (
          <div className="loading-favourite">
            <div className="loading-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            <Button text={"Sign up"} disabled={isLoading} />
            {signupSuccess && !error && <div className="success-message">Signup successful! Check your email inbox and spam box for verification instructions.</div>}
            { error && <div className="error">{error}</div>}
            {passwordMismatch && <div className="error">Password and confirmed password do not match.</div>}
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;