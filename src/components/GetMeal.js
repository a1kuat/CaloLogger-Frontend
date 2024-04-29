import React, { useState, useEffect } from 'react';
import { Grid , Typography, Box } from '@mui/material';
import MealCard from './MealCard';
import WeightCard from './WeightCard';
import AddMealAndWeight from './AddMealAndWeight';
import GraphMeal from './GraphMeal';
import GraphWeight from './GraphWeight';
function GetMeal() {
 const [meals, setMeals] = useState([]);
 const [weights, setWeight] = useState([]);

 const handleDelete = async (mealId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/v1/meal/?meal_id=${mealId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMeals(meals.filter(meal => meal.meal_id !== mealId));
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
 };

 const fetchMeals = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/v1/meal/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const sortedMeals = data.sort((a, b) => new Date(a.time) - new Date(b.time));
      setMeals(sortedMeals);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
 };

 useEffect(() => {
    fetchMeals();
 }, []);
 
 const fetchWeight = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:8000/v1/weight/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const sortedWeights = data.sort((a, b) => new Date(a.time) - new Date(b.time));
    setWeight(sortedWeights);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

useEffect(() => {
  fetchWeight();
}, []);

return (
  <div>
    <Box sx={{ ml: 2 }}>
      <Typography variant="h2" gutterBottom> </Typography>
    </Box>
    <AddMealAndWeight onAddMeal={fetchMeals} onAddWeight={fetchWeight} />
    <Box sx={{ ml: 2 }}>
      <Typography variant="h2" gutterBottom>Meal List</Typography>
    </Box>
    <Grid container spacing={2}>
      {meals.map((meal, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <MealCard meal={meal} onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
    <Box sx={{ ml: 2 }}>
      <Typography variant="h2" gutterBottom>Weight Measurements</Typography>
    </Box>
    <Grid container spacing={2}>
      {weights.map((weight, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <WeightCard weight={weight}/>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ ml: 2 }}>
      <Typography variant="h2" gutterBottom>Daily Calories Intake Change</Typography>
    </Box>
    <GraphMeal meals={meals} />
    <Box sx={{ ml: 2 }}>
      <Typography variant="h2" gutterBottom>Daily Weight Change</Typography>
    </Box>
    <GraphWeight weights={weights} />
  </div>
);
}

export default GetMeal;