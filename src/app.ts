import express from 'express';

import { envs } from './config';
import { GitHubController } from './presentation/github/github.controller';
import { GitHubService } from './presentation/services';

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());

  ///* DI
  const controller = new GitHubController(new GitHubService());

  app.post('/api/github', controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
