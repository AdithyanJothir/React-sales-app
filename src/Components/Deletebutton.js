import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import {delReq} from '../Services/Request';

export default function IconLabelButtons(props) {

  async function handleDelete(){
    const id = props.id;
    const url = props.url+`${id}/`;
    await delReq(url);
    props.handleUpdate();

  }

  return (
      
      <IconButton aria-label="delete" onClick={handleDelete} color="error">
  <DeleteIcon />
</IconButton>
      
  );
}