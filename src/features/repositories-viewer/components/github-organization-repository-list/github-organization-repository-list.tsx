type Props = {
  selectedRepositories: string[];
  setSelectedRepositories: (repos: string[]) => void;
};

export const GithubOrganizationRepositoryList = ({ selectedRepositories, setSelectedRepositories }: Props) => {
  return (
    <div>
      <h1>GithubOrganizationRepositoryList Component</h1>
    </div>
  );
};
