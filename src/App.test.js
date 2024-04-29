import React from 'react'; // Import React to use JSX
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import custom matchers
import { test, expect } from '@jest/globals'; // Explicitly import test and expect
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});