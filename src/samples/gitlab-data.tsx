import { useGitLabQuery } from 'src/hooks/gitGraphqlClient';
import { useQuery } from 'urql';
import { GET_GITLAB_PROJECTS } from './gitlab-queries';

export const GitLabData = () => {
  // const [result, reexecuteQuery] = useQuery<Group>({
  //   query: GET_GITLAB_PROJECTS,
  //   variables: {
  //     groupFullPath: 'gitlab-instance-b5710bbc'
  //   }
  // });
  const [result, reexecuteQuery] = useGitLabQuery<Group>({
    query: GET_GITLAB_PROJECTS,
    variables: {
      groupFullPath: 'gitlab-instance-b5710bbc'
    }
  });

  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) {
    return <div>An error occurred! {error.toString()}</div>;
  }

  const projects = data?.group.projects.nodes;

  return (
    <>
      <p>Gitlab Data</p>
      {projects && (
        <ul>
          {projects.map((project) => (
            <li>
              {project.name} {' : '} {project.webUrl}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
