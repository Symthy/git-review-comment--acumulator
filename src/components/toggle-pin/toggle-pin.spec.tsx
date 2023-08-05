import { render, screen } from '@testing-library/react';
import { TogglePin } from '.';

test('renders TogglePin component', () => {
  render(<TogglePin />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /TogglePin Component/i });

  expect(titleElement).toBeInTheDocument();
});
