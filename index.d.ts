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

interface DockerContainer {
  Names: string[]
  Image: string
  ImageID: string
  Id: string
  Ports: { 
    IP: string 
    PublicPort: string 
    PrivatePort: string
  } []
  Status: string
  State: string
}
