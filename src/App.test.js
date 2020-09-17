import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

test("Renders 'Register to SEER'", () => {
  const { getByText } = render(<App />);
  const HeroElement = getByText(/Register to SEER/i);
  expect(HeroElement).toBeInTheDocument();
});

test("Renders 'Login to SEER'", () => {
  const { getByText } = render(<App />);
  const TeamElement = getByText(/Login to SEER/i);
  expect(TeamElement).toBeInTheDocument();
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});