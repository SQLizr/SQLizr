import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from '../client/components/Dashboard';

beforeAll(() => {
  render(<Dashboard username={undefined} />);
});

describe('<Dashboard />', () => {
  // dashboard,to be a nav component with id = dashboard
  test('Dashboard should display welcome message with username', () => {
    expect(document.getElementById('dashboard')).toContainElement(document.getElementById('welcome-message'))
  })
  
});
