import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent'; // Import your React component

// Import jest-axe
import { axe } from 'jest-axe';

test('MyComponent should have no accessibility violations', async () => {
  const { container } = render(<page />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
