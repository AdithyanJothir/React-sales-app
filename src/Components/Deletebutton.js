import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import {delReq} from '../Services/Request';

export default function IconLabelButtons(props) {

  async function handleDelete(){
    const id = props.id;
    const url = props.url+`${id}/`;
    await delReq(url);
    window.location.reload();

  }

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
        Delete
      </Button>
      
    </Stack>
  );
}