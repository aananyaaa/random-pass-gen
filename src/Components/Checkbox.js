import Switch from '@mui/material/Switch';

const Checkbox = ({index, title, checked, onChange }) => {          // props received from App.js
    return (
      <li key = {index}>
        <label>{title}</label>
        <Switch
        onChange={onChange} checked={checked} 
        /> 
      </li>
    );
  };
  
  export default Checkbox;

