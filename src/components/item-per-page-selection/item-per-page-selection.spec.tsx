import { render, screen } from '@testing-library/react';
import { ItemPerPageSelection } from '.';

test('renders ItemPerPageSelection component', () => {
  render(<ItemPerPageSelection />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /ItemPerPageSelection Component/i });

  expect(titleElement).toBeInTheDocument();
});
