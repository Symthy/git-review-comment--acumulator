import { render, screen } from '@testing-library/react';
import { ItemsPerPageSelectBox } from '.';

test('renders ItemPerPageSelection component', () => {
  render(<ItemsPerPageSelectBox enabled={true} handleSelectItemsPerPage={() => {}} />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /ItemPerPageSelection Component/i });

  expect(titleElement).toBeInTheDocument();
});
