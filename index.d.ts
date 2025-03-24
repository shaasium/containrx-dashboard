interface User {
  email: string;
  token: string;
}

interface DockerImage {
  Id: string;
  RepoTags: string[];
  Created: number;
  Size: number;
}
