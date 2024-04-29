import React from 'react';
import { TextField, IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MealForm = ({ onSubmit, onWeightChange, weight }) => {
 return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4" >Add</Typography>
      <Typography variant="h4" >Weight:</Typography>
      <TextField
        label="Weight in kg"
        value={weight}
        onChange={onWeightChange}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: 'white', borderRadius: 1 }}
      />
      <IconButton type="submit" size="large" sx={{ backgroundColor: 'primary.main', color: 'white', borderRadius: 1, '&:hover': { backgroundColor: 'primary.dark' } }}>
        <AddIcon />
      </IconButton>
    </Box>
 );
};

export default MealForm;

