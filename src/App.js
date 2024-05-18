import { useState, useEffect } from "react";
import './Styles/App.css'
import { FaCopy, FaCheck } from "react-icons/fa6"
import usePasswordGenerator from "./hooks/usePasswordGenerator"
import StrengthChecker from "./Components/StrengthChecker"
import Checkbox from "./Components/Checkbox"
import ReplayIcon from '@mui/icons-material/Replay'
import { IconButton } from '@mui/material'
import Slider from '@mui/material/Slider'


export default function App() {
  const heading = "Password Generator";

  // List of checkboxes with initial states
  const checkboxList = [
    { title: "Include UpperCase Alphabets", checked: false },
    { title: "Include LowerCase Alphabets ", checked: false },
    { title: "Include Numbers", checked: false },
    { title: "Include Symbols", checked: false }
  ];

  // State variables
  const [rangeBarLengthValue, setRangeBarLengthValue] = useState(6);
  const [checkboxValue, setCheckboxValue] = useState(checkboxList);
  const [copied, setCopied] = useState(false);

  // Password generation hook
  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  // Function to handle checkbox change
  const handleCheckboxChange = (i) => {
    const checkboxNew = [...checkboxValue];
    checkboxNew[i].checked = !checkboxNew[i].checked;
    setCheckboxValue(checkboxNew);
  };

  // Function to handle range bar value change
  const OnChangingTheRangeValue = (e) => {
    const newValue = e.target.value;
    setRangeBarLengthValue(newValue);
  };

  // Function to handle copying password to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // Function to handle password regeneration
  const handleRegenerate = () => {
    generatePassword(checkboxValue, rangeBarLengthValue);
  };

  // Trigger password generation when checkbox or range bar changes
  useEffect(() => {
    generatePassword(checkboxValue, rangeBarLengthValue);
  }, [checkboxValue, rangeBarLengthValue]);

  return (
    <div className="background-container">
      <div className="main-container">
        {/* Heading for the password generator */}
        <div className="main-container-heading">{heading}</div>

        {/* Display generated password and copy button */}
        {password && (
          <div className="password-wrapper">
            <div>{password}</div>
            <div className="undo-copy-button">

              {/* Conditional rendering for copy icon */}
              {copied ? (
                <FaCheck />
              ) : (
                <FaCopy onClick={handleCopy} />
              )}

              {/* Replay icon for regenerating password */}
              <IconButton size="small">
                <ReplayIcon onClick={handleRegenerate} />
              </IconButton>
            </div>
          </div>
        )}

        {/* Options container */}
        <div className="options-container">
          {/* Character Length */}
          <div className="options-header">
            <label>Desired Character Length</label>
            <label>{rangeBarLengthValue}</label>
          </div>

          {/* Slider for character length */}
          <Slider
            className="range-bar"
            size="small"
            aria-label="Small"
            defaultValue={10}
            valueLabelDisplay="auto"
            min={6}
            max={30}
            value={rangeBarLengthValue}
            onChange={OnChangingTheRangeValue}
          />

          {/* Mapping the checkboxes */}
          <div className="checkboxes">
            {checkboxValue.map((checkbox, index) => (
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => handleCheckboxChange(index)}
                checked={checkbox.checked}
              />
            ))}
          </div>

          {/* Display error message if any */}
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </div>

        {/* Strength checker */}
        <StrengthChecker password={password} />
      </div>
    </div>
  );
}
