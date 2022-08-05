import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons(props) {
async function handleEdit(){
    props.editClick(props.row);    
  }
  return (
     

      <IconButton aria-label="delete" onClick={handleEdit} color="primary">
      <EditIcon />
</IconButton>
  );
}
