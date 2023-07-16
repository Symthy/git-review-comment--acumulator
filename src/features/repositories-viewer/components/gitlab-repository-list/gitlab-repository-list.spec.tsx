import { render, screen } from '@testing-library/react';
import { GitlabRepositoryList } from '.';

test('renders GitlabRepositoryList component', () => {
  render(<GitlabRepositoryList />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /GitlabRepositoryList Component/i });

  expect(titleElement).toBeInTheDocument();
});
