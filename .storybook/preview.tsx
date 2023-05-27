import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
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

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    msw: {
      handlers: {
        menu: handlers
      }
    },
    process: {
      env: {}
    }
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader]
};

export default preview;
