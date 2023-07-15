export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        default: 'src/features/',
        message: 'component path (e.g. src/features/):'
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/index.tsx',
        templateFile: 'plop-templates/component/index.tsx.hbs'
      },
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/{{kebabCase name}}.tsx',
        templateFile: 'plop-templates/component/component.tsx.hbs'
      },
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/{{kebabCase name}}.spec.tsx',
        templateFile: 'plop-templates/component/component.spec.tsx.hbs'
      },
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/{{kebabCase name}}.stories.tsx',
        templateFile: 'plop-templates/component/component.stories.tsx.hbs'
      }
    ]
  });
}
