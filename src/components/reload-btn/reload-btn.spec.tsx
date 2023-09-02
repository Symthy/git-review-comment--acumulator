import { render, screen } from '@testing-library/react';
import { ReloadBtn } from '.';

test('renders ReloadBtn component', () => {
  render(<ReloadBtn />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /ReloadBtn Component/i });

  expect(titleElement).toBeInTheDocument();
});
