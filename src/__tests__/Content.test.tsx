import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react";
import "@testing-library/jest-dom";

import Content from '../client/components/Content';

beforeEach(() => {
  render(<Content />);
});

describe('<Content />', () => {
  // dashboard,to be a nav component with id = dashboard
  test('Content should display query cards', () => {
    // expect(document.getElementById('dashboard')).toHaveTextContent("Welcome");
    // expect(document.getElementById('dashboard')).toContainElement(document.getElementById('welcome-message'))
    // // expect(document.getElementById('dashboard')).toBe(document.getElementById('welcome-message'))
  });

  test('something?? should be displayed if there are no query cards to display', () => {

  })

  describe('Filter Bar', () => {
    // there should be an input/search field to type up metric names
    test('should include input/search field for metric names', () => { 
      // input/search field should have proper input validation and input sanitization (no injection attacks to mess up our SQL Database)
      // an input value that does not match any saved queries should display and error message
      // a valid input value should correctly display a matching query card
    });

    // there should be a dropdown menu to select HTTP type (add/delete/edit/select)
    test('should include a dropdown menu to select request type with options for add/delete/edit/select', () => {
      // the type selector should be of role combobox
      // const selector = document.getElementById('request-type');
      const selector = screen.getByRole('combobox', {name: 'type-selector'});
      expect(selector).toBeInTheDocument;
      // expect(selector).toBe('Request Type');
    
      // the selector has a placeholder test of "request type"
      expect(selector).toHaveDisplayValue('Request Type');

      // the type selector should include options of add/delete/edit/select
      // fire and event to change the selector's target, check to see if it works
      fireEvent.change(selector, {target: {value: 'add'}});
      expect(selector).toHaveDisplayValue('Add');
      
      fireEvent.change(selector, {target: {value: 'delete'}});
      expect(selector).toHaveDisplayValue('Delete');
      
      fireEvent.change(selector, {target: {value: 'update'}});
      expect(selector).toHaveDisplayValue('Update');
      
      fireEvent.change(selector, {target: {value: 'find'}});
      expect(selector).toHaveDisplayValue('Find');
      
      // when an option is chosen, only queries that match the type selector should be displayed
      // when no queries match the option chosen, an error message should be properly displayed
    });

    // there should be a dropdown menu with available tags
    test('should include a dropdown menu to multi-select available tags', () => {
      // the tag selector should be of role listbox
      // the tag selector should correctly populate its inner option items based on available tags
      // the tag selector should be able to select/display multiple tags
      // when an option is chosen, only queries that match ALL tags selected should be displayed
      // when no queries match the option chosen, an error message should be properly displayed
    });

    // there should be a dropdown menu with ordering of query cards (??? Need to check with backend how to order. Alphabetical?)
    test('should include a dropdown menu to sort the query cards', ()=>{
      // the sort selector should be of role combobox
      // the sort selector should have options: A-Z and Z-A
      // upon selection of sort selector, query cards should be sorted in the correct order
    })

    // there should be a toggle button for favorites
    test('should include a toggle-able button for favorites', () => {
      // toggle should have role of button, but type of switch
      // toggling button on/off should correctly display queries
      // handle the case of no queries shown
    });

  })
  
});
