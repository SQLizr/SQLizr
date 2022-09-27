import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Toolbox from '../client/components/Toolbox';

// before all tests, render the Toolbox component
beforeAll(() => {
  render(<Toolbox />);
});

describe('<Toolbox />', () => {
  test('we have a test here', () => {});

  // if authorization level is admin, all 4 sidebar buttons should be visible for user

  // if authorization level is user, only 2 sidebar buttons should be visible
  // create and edit queries should NOT be visible to user
  
})