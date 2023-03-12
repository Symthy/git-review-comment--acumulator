import { GET_GITLAB_PROJECTS } from 'src/data/gitlab/gitlab-queries';
import { useGithubQuery, useGitLabQuery } from 'src/hooks/useGitQuery';
import { GET_GITHUB_REPOSITORIES } from 'src/data/github/github-queries';

export const GitRepositories = () => {
  const [githubResult, reexecuteGithubQuery] = useGithubQuery<RepositoryData>({
    query: GET_GITHUB_REPOSITORIES,
    variables: {
      owner: 'Symthy'
    }
  });

  const [gitlabResult, reexecuteGitlabQuery] = useGitLabQuery<Group>({
    query: GET_GITLAB_PROJECTS,
    variables: {
      groupFullPath: 'gitlab-instance-b5710bbc'
    }
  });

  const { data: githubData, fetching: githubFetching, error: githubError } = githubResult;
  const { data: gitlabData, fetching: gitlabFetching, error: gitlabError } = gitlabResult;
  if (githubFetching || gitlabFetching) return <p>Loading...</p>;
  if (githubError) {
    return <div>An error occurred! {githubError.toString()}</div>;
  }
  if (gitlabError) {
    return <div>An error occurred! {gitlabError.toString()}</div>;
  }

  const githubRepositories = githubData?.user.repositories.nodes.map((repo) => {
    return {
      ...repo,
      source: 'Github'
    };
  });
  const gitlabRepositories = gitlabData?.group.projects.nodes.map((repo) => {
    return {
      name: repo.name,
      url: repo.webUrl,
      source: 'Gitlab'
    };
  });

  const repositories: { name: string; url: string; source: string }[] = [];
  if (githubRepositories) {
    repositories.push(...githubRepositories);
  }
  if (gitlabRepositories) {
    repositories.push(...gitlabRepositories);
  }

  return (
    <>
      <p>Repositories</p>
      <table border={1}>
        <thead>
          <tr>
            <th>Source</th>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        {repositories.map((repo) => (
          <tbody>
            <tr>
              <td align='left'>{repo.source}</td>
              <td align='left'>{repo.name}</td>
              <td align='left'>{repo.url}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};
