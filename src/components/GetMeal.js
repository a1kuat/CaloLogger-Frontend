import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import MealCard from './MealCard';
import AddMealAndWeight from './AddMealAndWeight';

function GetMeal() {
 const [meals, setMeals] = useState([]);

 const handleDelete = async (mealId) => {
    try {
      const response = await fetch(`http://localhost:8000/v1/meal/?meal_id=${mealId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
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
      const response = await fetch('http://localhost:8000/v1/meal/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
 };

 useEffect(() => {
    fetchMeals();
 }, []);

 return (
    <div>
      <h1>Meal List</h1>
      <AddMealAndWeight onAddSuccess={fetchMeals} />
      <Grid container spacing={2}>
        {meals.map((meal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MealCard meal={meal} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </div>
 );
}

export default GetMeal;