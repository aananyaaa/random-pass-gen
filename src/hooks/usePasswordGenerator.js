import { useState, useEffect } from "react";

const usePasswordGenerator = () => {
  // State variables for generated password and error message
  const [password, setGeneratedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to generate password based on selected options and length
  const generatePassword = (checkboxValue, length) => {
    let charset = "",
      generatedPassword = "";

    // Filter selected options from checkboxes where the state is checked
    const selectedOption = checkboxValue.filter((checkbox) => checkbox.checked);
   
    // If no option is selected, display error message
    if (selectedOption.length === 0) {
      setErrorMessage("Select at least one option."); 
      setGeneratedPassword("");
      return;
    }

    // Generate character set based on selected options
    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include UpperCase Alphabets":
          for (let i = 65; i <= 90; i++) {
            charset += String.fromCharCode(i);
          }
          break;

        case "Include LowerCase Alphabets ":
          for (let i = 97; i <= 122; i++) {
            charset += String.fromCharCode(i);
          }
          break;

        case "Include Numbers":
          for (let i = 48; i <= 57; i++) {
            charset += String.fromCharCode(i);
          }
          break;

        case "Include Symbols":
          for (let i = 33; i <= 47; i++) {
            charset += String.fromCharCode(i);
          }
          for (let i = 58; i <= 64; i++) {
            charset += String.fromCharCode(i);
          }
          for (let i = 91; i <= 96; i++) {
            charset += String.fromCharCode(i);
          }
          for (let i = 123; i <= 126; i++) {
            charset += String.fromCharCode(i);
          }
          break;

        default:
          break;
      }
    });

    // Generate password randomly from the character set
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    
    // Set generated password and clear error message
    setGeneratedPassword(generatedPassword);
    setErrorMessage("");
  };

  // Return generated password, error message, and generator function
  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;