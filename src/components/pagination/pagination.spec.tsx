import { render, screen } from '@testing-library/react';
import { Pagination } from '.';

test('renders Pagenation component', () => {
  render(<Pagination enabled={true} totalPages={2} handleSelectActivePage={() => {}} />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /Pagenation Component/i });

  expect(titleElement).toBeInTheDocument();
});
