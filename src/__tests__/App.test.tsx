import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


import App from '../client/App';
import { UserData } from '../client/Types';

const mockUserData: UserData = {
  authorization_status: 'admin',
  favorites: [1,3],
  organization: 'mockOrg',
  password: 'mockPW',
  search_history: [1,2],
  user_id: 2,
  username: 'mockUser'
}

beforeAll(() => {
  render(<App />);
});

describe('<App/>', () => {
  // dashboard,to be a nav component with id = dashboard
  test('app should display dashboard', () => {
    expect(document.getElementById('dashboard')).toBeInTheDocument
  })
  // toolbox is a div, id:toolbox 
  test('app should display toolbox', () => {
    expect(document.getElementById('toolbox')).toBeInTheDocument
  })
  // content is a main, with id:content
  test('app should display a main content box', () => {
    expect(document.getElementById('content')).toBeInTheDocument;
    expect(document.getElementById('content')).not.toBeNull;
  });
});

// expect 3 components to be within App

