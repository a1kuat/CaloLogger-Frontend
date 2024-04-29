import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import PropTypes from 'prop-types';

const GraphWeight = ({ weights }) => {
  const calculateAverageWeightPerDay = (weights) => {
    const weightsPerDay = weights.reduce((acc, weight) => {
      const weightDate = new Date(weight.time).toDateString();
      if (!acc[weightDate]) {
        acc[weightDate] = { count: 0, total: 0 };
      }
      acc[weightDate].count += 1;
      acc[weightDate].total += weight.weight;
      return acc;
    }, {});

    // Sort the entries by date in ascending order
    const sortedEntries = Object.entries(weightsPerDay).sort((a, b) => new Date(a[0]) - new Date(b[0]));

    return sortedEntries.map(([day, { count, total }]) => ({
      day,
      averageWeight: total / count,
    }));
  };

  const data = calculateAverageWeightPerDay(weights);

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
      <Bar dataKey="averageWeight" fill="#4CAF50" /> 
    </BarChart>
  );
};

GraphWeight.propTypes = {
  weights: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
};


export default GraphWeight;
