import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup); //clean the DOM!

describe('<App />', () => {
  it('renders the application', () => {
    const { queryByTestId, debug } = render(<App />);
    // expect(queryByTestId('application')).toBeTruthy();
    expect(queryByTestId('application').classList.contains('darkmode')).toBeFalsy();
  });

  it('renders the application', () => {
    const { queryByTestId, debug } = render(<App darkmodeDefault />);
    debug();
    // expect(queryByTestId('application')).toBeTruthy();
    expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy();
  });
});