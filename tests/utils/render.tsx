import { render as testingLibraryRender } from '@testing-library/react';
import { ThemeProvider } from '../../src/ThemeProvider';
import React from 'react';

export function render(children: React.ReactNode) {
  const { rerender, ...others } = testingLibraryRender(<ThemeProvider>{children}</ThemeProvider>);
  return {
    rerender: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
      rerender(<ThemeProvider>{ui}</ThemeProvider>),
    ...others
  };
}
