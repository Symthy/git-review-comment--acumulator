import { useQuery } from '@apollo/client';
import { GET_GITHUB_ISSUE } from 'src/github-queries';

export const GithubData = () => {
  const { loading, error, data } = useQuery<RepositoryData>(GET_GITHUB_ISSUE, {
    variables: {
      owner: 'Symthy',
      name: 'TodoList-ts-pre'
    }
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{`Error: ${error}`}</p>;

  const issueEdges = data?.repository.issues.edges;

  return (
    <>
      <p>Github Data</p>
      {issueEdges && (
        <ul>
          {issueEdges.map((issue) => (
            <li>
              {issue.node.title} {' : '} {issue.node.url}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
