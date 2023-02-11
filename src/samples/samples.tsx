import { GithubData } from './github-data';
import { GitLabData } from './gitlab-data';

export const Samples = () => {
  return (
    <>
      {/* <Provider value={githubClient}> */}
      <GithubData />
      {/* </Provider> */}
      {/* <Provider value={gitlabClient}> */}
      <GitLabData />
      {/* </Provider> */}
    </>
  );
};
