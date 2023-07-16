import { render, screen } from '@testing-library/react';
import { GithubOrganizationRepositoryList } from '.';

test('renders GithubOrganizationRepositoryList component', () => {
  render(<GithubOrganizationRepositoryList />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /GithubOrganizationRepositoryList Component/i });

  expect(titleElement).toBeInTheDocument();
});
