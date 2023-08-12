import { render, screen } from '@testing-library/react';
import { CheckableLineBoxesPagination } from '.';

test('renders CheckableLineBoxesPagination component', () => {
  render(<CheckableLineBoxesPagination />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /CheckableLineBoxesPagination Component/i });

  expect(titleElement).toBeInTheDocument();
});
