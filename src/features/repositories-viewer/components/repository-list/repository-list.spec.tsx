import { render, screen } from '@testing-library/react';
import { RepositoryList } from '.';

test('renders RepositoryList component', () => {
  render(<RepositoryList />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /RepositoryList Component/i });

  expect(titleElement).toBeInTheDocument();
});
