import express from 'express';

import { envs } from './config';
import { GitHubController } from './presentation/github/github.controller';
import { DiscordService, GitHubService } from './presentation/services';
import { GithubSha256Middleware } from './presentation/middlewares';

(() => {
  main();
})();

function main() {
  const app = express();

  app.use(express.json());
  app.use(GithubSha256Middleware.verifySignature);

  ///* DI
  const controller = new GitHubController(
    new GitHubService(),
    new DiscordService()
  );

  app.post('/api/github', controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
