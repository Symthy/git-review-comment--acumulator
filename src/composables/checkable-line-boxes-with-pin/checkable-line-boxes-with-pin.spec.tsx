import { render, screen } from '@testing-library/react';
import { CheckableLineBoxesWithPin } from '.';
import { CheckableLineData } from 'src/components/checkable-line-box';

test('renders CheckablePinLineBoxes component', () => {
  render(
    <CheckableLineBoxesWithPin
      currentViewItems={[]}
      sortLogic={function (a: CheckableLineData, b: CheckableLineData): number {
        return a > b ? -1 : 1;
      }}
    />
  );

  const titleElement = screen.getByRole('heading', { level: 1, name: /CheckablePinLineBoxes Component/i });

  expect(titleElement).toBeInTheDocument();
});
