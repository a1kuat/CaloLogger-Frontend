import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import PropTypes from 'prop-types';

const MealCard = ({ meal, onDelete }) => {
  const mealData = JSON.parse(meal.calorie_ninjas_response.replace(/'/g, '"'));
  const formattedTime = moment(meal.time).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <Card sx={{ border: '2px solid primary', boxShadow: 5, margin: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div">
            {mealData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {formattedTime}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
                  Calories: {mealData.calories}
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Serving Size: {mealData.serving_size_g}g
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Fat Total: {mealData.fat_total_g}g
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Fat Saturated: {mealData.fat_saturated_g}g
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Protein: {mealData.protein_g}g
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Sodium: {mealData.sodium_mg}mg
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Potassium: {mealData.potassium_mg}mg
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Cholesterol: {mealData.cholesterol_mg}mg
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Carbohydrates Total: {mealData.carbohydrates_total_g}g
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Fiber: {mealData.fiber_g}g
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Sugar: {mealData.sugar_g}g
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="delete" onClick={() => onDelete(meal.meal_id)} size="large">
          <DeleteIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

MealCard.propTypes = {
  meal: PropTypes.shape({
    calorie_ninjas_response: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    meal_id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default MealCard;
