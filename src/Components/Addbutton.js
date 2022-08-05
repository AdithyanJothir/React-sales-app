import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function IconLabelButtons(props) {

  return (
      
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={props.addClick}>

          Add
        </Button>

      
  );
}