import { render, screen } from '@testing-library/react';
import { CheckableLineBox } from '.';

test('renders CheckableLineBox component', () => {
  render(<CheckableLineBox />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /CheckableLineBox Component/i });

  expect(titleElement).toBeInTheDocument();
});
