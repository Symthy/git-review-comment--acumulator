import { render, screen } from '@testing-library/react';
import { GithubOwnRepositoryList } from '.';

test('renders GithubOwnRepositoryList component', () => {
  render(<GithubOwnRepositoryList />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /GithubOwnRepositoryList Component/i });

  expect(titleElement).toBeInTheDocument();
});
