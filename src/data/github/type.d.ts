type RepositoryData = {
  user: {
    repositories: {
      nodes: [
        {
          name: string;
          url: string;
        }
      ];
    };
  };
};

type RepositoryIssues = {
  repository: {
    issues: {
      edges: IssueEdgeNode[];
    };
  };
};

type IssueEdgeNode = {
  node: {
    title: string;
    url: string;
    labels: {
      edges: LabelEdgeNode[];
    };
  };
};

type LabelEdgeNode = {
  node: {
    name: string;
  };
};

type RepositoryIssues = {
  repository: {
    issues: {
      edges: IssueEdgeNode[];
    };
  };
};

type IssueEdgeNode = {
  node: {
    title: string;
    url: string;
    labels: {
      edges: LabelEdgeNode[];
    };
  };
};

type LabelEdgeNode = {
  node: {
    name: string;
  };
};
