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
