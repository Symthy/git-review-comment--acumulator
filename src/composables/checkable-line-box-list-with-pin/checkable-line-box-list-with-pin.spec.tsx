import { render, screen } from '@testing-library/react';
import { CheckableLineBoxListWithPin } from '.';
import { CheckableLineData } from 'src/components/checkable-line-box';

test('renders CheckablePinLineBoxes component', () => {
  render(<CheckableLineBoxListWithPin currentViewItems={[]} />);

  const titleElement = screen.getByRole('heading', { level: 1, name: /CheckablePinLineBoxes Component/i });

  expect(titleElement).toBeInTheDocument();
});
