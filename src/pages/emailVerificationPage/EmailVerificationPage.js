import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmailVerificationPage.scss';

const EmailVerification = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState();
  const verifyCounter = useRef(0);

  useEffect(() => {
    const verifyEmail = async () => {
      if (verifyCounter.current === 1) {
        return '';
      }

      verifyCounter.current += 1;
      console.log(verifyCounter.current);

      try {
        // Make a GET request to the server to verify the email
        const response = await axios.get(`https://free-game-hub-backend.vercel.app/user/verify?token=${token}`);

        // Update the verification status based on the response
        setVerificationStatus(response.data.message);
      } catch (error) {
        console.error(error);
        // Handle the error and set the verification status accordingly
        setVerificationStatus(error.response.data.error);
      }
    };

    // Call the verifyEmail function when the component mounts
    verifyEmail();
  }, []);

  return (
    <div className="verification-container">
      <h3>{verificationStatus}</h3>
    </div>
  );
};

export default EmailVerification;
