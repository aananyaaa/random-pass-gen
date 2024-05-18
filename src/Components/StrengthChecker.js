import React, { Fragment } from "react";
import '../Styles/StrengthChecker.css'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const CheckPasswordStrength = ({ password = "" }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    width: "100%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: strength.color,
    },
  }));

  // Text to display when password length is null or too short
  const TextWhenLenIsNull = "Unable to generate password: length too short or no options selected";
  
  // Function to calculate password strength based on its length, will return password strength along with the percentage and color
  const getPasswordStrength = () => {
    const passwordLength = password.length;
    let score = 0;
  
    // Count uppercase letters
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    // Count lowercase letters
    const lowercaseCount = (password.match(/[a-z]/g) || []).length;
    // Count numbers
    const numberCount = (password.match(/[0-9]/g) || []).length;
    // Count special characters
    const specialCharCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
  
    // Calculate score based on various criteria
    score += passwordLength * 4; // Each character contributes 4 points
    score += (uppercaseCount > 0) ? (passwordLength - uppercaseCount) * 2 : 0; // Bonus for uppercase letters
    score += (lowercaseCount > 0) ? (passwordLength - lowercaseCount) * 1 : 0; // Bonus for lowercase letters
    score += (numberCount * 2); // Each number contributes 4 points
    score += (specialCharCount * 5); // Each special character contributes 5 points
  
    // Determine password strength based on the score
    if(score<6) return ""
      else if (score <= 30) {
      return {
        passwordStrength: "Weak",
        passwordStrengthPercentage: "25",
        color: "red",
      };
    } else if (score <= 40) {
      return {
        passwordStrength: "Medium",
        passwordStrengthPercentage: "50",
        color: "orange",
      };
    } else if (score <= 70) {
      return {
        passwordStrength: "Strong",
        passwordStrengthPercentage: "75",
        color: "yellow",
      };
    } else {
      return {
        passwordStrength: "Very Strong",
        passwordStrengthPercentage: "100",
        color: "green",
      };
    }
  };
  

  // Get the strength object based on password length
  const strength = getPasswordStrength();

  // If password is null or too weak, display appropriate message
  if (!strength) return <div className="password-too-weak">{}</div>
  
  // Render password strength display
  return (
    <Fragment>
      <div className="strength-display-wrapper">
        <div className="strength-display-inner-wrapper">
          <span> STRENGTH</span>
          <span >{strength.passwordStrength}</span>
        </div>
        <div>
          <BorderLinearProgress variant="determinate" value={strength.passwordStrengthPercentage} />
        </div>
      </div>
    </Fragment>
  );
};

export default CheckPasswordStrength;