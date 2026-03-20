import { expect, test } from 'vitest'
import { demo_sum } from '../utils/utils'

test('demo_sum', () => {
  expect(demo_sum(1, 2)).toBe(3)
})

// import { render, screen } from '@testing-library/react';
// import App from './App';

//interesting test script, leaving case we need to build out on these kinds of tests

// test('renders the food bank intake portal home page', () => {
//   render(<App />);
//   const heading = screen.getByText(/Welcome to the Food Bank Intake Portal/i);
//   expect(heading).toBeInTheDocument();
// });

// test('renders navigation links', () => {
//   render(<App />);
//   const nav = screen.getByRole('navigation');
//   expect(nav).toBeInTheDocument();
//   expect(screen.getAllByRole('button', { name: /New Intake/i }).length).toBeGreaterThan(0);
//   expect(screen.getAllByRole('button', { name: /Returning Client/i }).length).toBeGreaterThan(0);
//   expect(screen.getAllByRole('button', { name: /Available Items/i }).length).toBeGreaterThan(0);
// });

