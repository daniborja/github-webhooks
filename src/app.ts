import express from 'express';

import { envs } from './config';
import { GitHubController } from './presentation/github/github.controller';

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());


  const controller = new GitHubController();

  app.post('/api/github', controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
