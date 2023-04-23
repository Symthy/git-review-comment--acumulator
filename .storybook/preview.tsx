import { initialize, mswDecorator } from 'msw-storybook-addon';
import React from 'react';

// Initialize MSW
initialize(); // setup はする必要なし

const commonDecorator = (StoryFn: Function) => {
  return (
    <>
      <StoryFn />
    </>
  );
};

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator, commonDecorator];
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  msw: {
    handlers: {}
  },
  process: {
    env: {}
  }
};
