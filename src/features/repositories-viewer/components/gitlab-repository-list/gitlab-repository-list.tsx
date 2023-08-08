type Props = {
  selectedRepositories: string[];
  setSelectedRepositories: (repos: string[]) => void;
};

export const GitlabRepositoryList = ({ selectedRepositories, setSelectedRepositories }: Props) => {
  return (
    <div>
      <h1>GitlabRepositoryList Component</h1>
    </div>
  );
};
