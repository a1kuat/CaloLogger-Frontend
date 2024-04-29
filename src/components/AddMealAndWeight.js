import React, { useState } from 'react';
import { Box, Stack, Snackbar, Alert } from '@mui/material';
import MealForm from './MealForm';
import WeightForm from './WeightForm';

function AddMealAndWeight({ onAddMeal , onAddWeight}) {
 const [mealName, setMealName] = useState('');
 const [weight, setWeight] = useState('');
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState('');

 const handleMealSubmit = async (event) => {
    event.preventDefault();
    console.log(`Adding meal: ${mealName}`);
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
        };
    
        try {
            const response = await fetch(`http://localhost:8000/v1/meal/?name=${encodeURIComponent(mealName)}`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMealName('');
            setMessage('Meal successfully added');
            setOpen(true);
            if (onAddMeal) {
                onAddMeal();
              }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setMessage('Failed to add meal');
            setOpen(true);
        }
 };

 const handleWeightSubmit = async (event) => {
    event.preventDefault();
    console.log(`Adding weight: ${weight}`);
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
            },
        };
    
        try {
            const response = await fetch(`http://localhost:8000/v1/weight/?weight=${encodeURIComponent(weight)}`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMealName('');
            setMessage('Weight successfully added');
            setOpen(true);
            if (onAddWeight) {
                onAddWeight();
              }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setMessage('Failed to add weight');
            setOpen(true);
        }
 };

 return (
    <Box>
      <Stack direction="row" spacing={10} alignItems="center"  justifyContent= "center">
        <MealForm
          onSubmit={handleMealSubmit}
          onMealNameChange={(e) => setMealName(e.target.value)}
          mealName={mealName}
        />
        <WeightForm
          onSubmit={handleWeightSubmit}
          onWeightChange={(e) => setWeight(e.target.value)}
          weight={weight}
        />
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '100%',
          "& .MuiSnackbarContent-root": {
            backgroundColor: 'green',
            color: 'white',
          },
        }}
      >
        <Alert onClose={() => setOpen(false)} variant='filled' severity="success" sx={{ width: '80%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
 );
}

export default AddMealAndWeight;
