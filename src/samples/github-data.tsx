import { useGithubQuery } from 'src/hooks/useGitQuery';
import { GET_GITHUB_ISSUES } from '../data/github/github-queries';

export const GithubData = () => {
  // const [result, reexecuteQuery] = useQuery<RepositoryData>({
  //   query: GET_GITHUB_ISSUE,
  //   variables: {
  //     owner: 'Symthy',
  //     name: 'TodoList-ts-pre'
  //   }
  // });
  const [result, reexecuteQuery] = useGithubQuery<RepositoryIssues>({
    query: GET_GITHUB_ISSUES,
    variables: {
      owner: 'Symthy',
      name: 'TodoList-ts-pre'
    }
  });

  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) {
    return <div>An error occurred! {error.toString()}</div>;
  }

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
