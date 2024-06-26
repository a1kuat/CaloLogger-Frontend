import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

const WeightCard = ({ weight}) => {
  const formattedTime = moment(weight.time).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <Card sx={{ border: '2px solid primary', boxShadow: 5, margin: 2, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div">
            {weight.weight}kg
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {formattedTime}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

WeightCard.propTypes = {
  weight: PropTypes.shape({
    time: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
};


export default WeightCard;
