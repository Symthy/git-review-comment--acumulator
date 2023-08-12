import { render, screen } from '@testing-library/react';
import { OrderSelectBox } from '.';
import { Sorter } from './types';

test('renders SelectBox component', () => {
  render(<OrderSelectBox handleSelectOrder={(itemsSorter) => {}} />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /SelectBox Component/i });

  expect(titleElement).toBeInTheDocument();
});
