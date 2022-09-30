export default {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // plugin:react/recommended', // airbnbがまかなっている
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'prettier'
  ],
  overrides: [
    {
      files: '*.stories.@(ts|tsx|js|jsx)',
      extends: 'plugin:storybook/recommended',
      rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off', // devDependencies からの import を許可
        'react/jsx-props-no-spreading': 'off', // spread構文でエラーが出るため抑止
        '@typescript-eslint/await-thenable': 'off' // Page.stories.tsx でエラーになるため暫定抑止..
      }
    }
  ],
  ignorePatterns: [
    // なぜか eslintignoreが効かないため、ここに設定...
    'dist',
    'node_modules',
    'mockServiceWorker.js',
    '**/*.config.ts',
    '**/*.config.js',
    '.eslintrc.js',
    '.prettierrc.js',
    '.storybook'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    // sourceType: 'module',
    tsconfigRootDir: __dirname, // プロジェクトルートの絶対パス
    project: './tsconfig.json' // コンパイラ設定ファイルの設定（tsconfigRootDirからの相対パス）
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'unused-imports', // 使っていないimportを自動で削除
    'import'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // import React from 'react'が無くともエラーにしない
    'react/prop-types': 'off', // TypeScriptでチェックしているため不要
    'react/no-unused-prop-types': 'off', // props メンバーの未使用許可
    'react/require-default-props': 'off', // optional paramater (?) 許容
    'import/prefer-default-export': 'off', // named export 使用可にする
    'import/no-default-export': 'error', // default export を禁止
    '@typescript-eslint/no-non-null-assertion': 'off', // Non-null assertion operator (!) 許容
    '@typescript-eslint/no-unused-vars': 'off', // unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', // 不要なimportの削除
    'unused-imports/no-unused-vars': [
      'warn', // unused-importsでno-unused-varsのルールを再定義
      {
        vars: 'all', // global スコープを含め全ての変数をチェック
        varsIgnorePattern: '^_', // チェックしない変数を Regexp で指定
        args: 'after-used', // 使用変数が引数の最後であれば、それより前の引数は使ってなくても OK
        argsIgnorePattern: '^_' // varsIgnorePattern の引数版
      }
    ],
    'react/function-component-definition': [
      'error', // アロー関数以外受け付けない設定
      {
        namedComponents: 'arrow-function'
        // unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'] // jsx形式のファイル拡張子をjsxもしくはtsxに限定
      }
    ],
    'no-param-reassign': [
      'error', // パラメーターのプロパティ変更を許可
      { props: false }
    ],
    'no-void': [
      'error',
      {
        allowAsStatement: true // void演算子の許可
      }
    ],
    'import/extensions': [
      'error',
      {
        js: 'never', // importのときに以下の拡張子を記述しなくてもエラーにしない
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        'newlines-between': 'never', // グループ毎にで改行を入れない
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          // react 関連を先頭に
          {
            pattern: 'react**',
            group: 'external',
            position: 'before'
          },
          // プロジェクトに合わせて調整
          {
            pattern: '{@/libs/**,@/features/**,@/app/**}',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '{@/components/**,@/pages/**}',
            group: 'internal',
            position: 'before'
          },
          // css modules は一番最後にする
          {
            pattern: '{@/**.module.css,@/**.module.scss}',
            group: 'index',
            position: 'after'
          }
        ]
      }
    ]
    // 'import/resolver': {
    //   typescript: []
    // },
  }
};
