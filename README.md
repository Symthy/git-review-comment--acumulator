# git-review-comment--acumulator

## System Test

Required startup gitlab container.

```sh
cp conf/.env.template conf/.env
# should set the value of GITLAB_VOLUME_PATH in .env file.
./docker/run_gitlab_continer.sh
```

Access to http://localhost

※ how to confirm password of gitlab's root account

```
docker container exec -it gitlab bash
cat /etc/gitlab/initial_root_password
```

## referenced and used oss

- 構成： https://github.com/alan2207/bulletproof-react

- Store： https://github.com/pmndrs/zustand

- urql： https://github.com/urql-graphql/urql

- mock: graphql-codegen-typescript-mock-data

  - https://github.com/ardeois/graphql-codegen-typescript-mock-data
  - [モックを自動生成してくれる graphql-codegen-typescript-mock-data が便利だった](https://zenn.dev/vallis/articles/83b1a10d5325e9)
  - ※ github/gitlab の ドキュメント大きすぎてそのまま自動生成コードを使うと storybook では out of memory が起きるため、利用は保留。

- UI Library: [mantine](https://mantine.dev/)
