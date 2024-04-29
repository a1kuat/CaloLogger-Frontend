import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const WeightForm = ({ onSubmit, onWeightChange, weight }) => {
 return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Add Weight"
        value={weight}
        onChange={onWeightChange}
        sx={{ backgroundColor: 'white' }}
      />
      <IconButton type="submit" size="small" sx={{ backgroundColor: 'white', color: 'black', marginLeft: 1, marginTop: 1 }}>
        <AddIcon />
      </IconButton>
    </form>
 );
};

export default WeightForm;
