import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
  const [value, setValue] = React.useState(null);
  const attr = props.attr;

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        props.setSearch(newValue);
      }}
      
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={attr}
      getOptionLabel={(option) => {
         return option;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search.." />
      )}
    />
  );
  

}


