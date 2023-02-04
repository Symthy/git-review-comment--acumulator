type RepositoryData = {
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

type Group = {
  group: {
    id: string;
    name: string;
    projects: Project;
  };
};

type Project = {
  nodes: {
    name: string;
    webUrl: string;
  }[];
};
