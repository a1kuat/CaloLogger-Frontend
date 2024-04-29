import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const GraphMeal = ({ meals }) => {
 const calculateCaloriesPerDay = (meals) => {
    const caloriesPerDay = meals.reduce((acc, meal) => {
       const mealDate = new Date(meal.time).toDateString();
       if (!acc[mealDate]) {
         acc[mealDate] = 0;
       }
       const calorieData = JSON.parse(meal.calorie_ninjas_response.replace(/'/g, '"'));
       acc[mealDate] += calorieData.calories;
       return acc;
    }, {});
   
    const sortedEntries = Object.entries(caloriesPerDay).sort((a, b) => new Date(a[0]) - new Date(b[0]));
   
    return sortedEntries.map(([day, calories]) => ({ day, calories }));
   };
   
 const data = calculateCaloriesPerDay(meals);

 return (
    <BarChart
      width={1900}
      height={900}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="calories" fill="#8884d8" />
    </BarChart>
 );
};

export default GraphMeal;
