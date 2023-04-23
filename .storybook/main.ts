import { fileURLToPath } from 'node:url';
import path from 'node:path';
import react from '@vitejs/plugin-react';
export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    storyStoreV7: true,
    interactionsDebugger: true
  },
  viteFinal: async (config) => {
    // vite.config.ts 再利用うまくいかなかったため直接指定
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      src: path.resolve(__dirname, '../src'),
      public: path.resolve(__dirname, '../public')
    };

    // ref: https://zenn.dev/rabbit/scraps/e9ab3527f49d45
    // ref: https://chot-inc.com/blog/gmwju-vx95/
    config.plugins = config.plugins.filter(
      (plugin) => !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react'))
    );
    config.plugins.push(
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      })
    );
    config.esbuild = {
      // Fixed: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
      // https://github.com/vitejs/vite/issues/8644
      logOverride: {
        'this-is-undefined-in-esm': 'silent'
      }
    };
    return config;
  }
};
export const framework = '@storybook/react';
