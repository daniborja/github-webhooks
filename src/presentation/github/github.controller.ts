import { Request, Response } from 'express';

import { DiscordService, GitHubService } from '../services';

export class GitHubController {
  ///* DI
  constructor(
    private readonly githubService: GitHubService,
    private readonly discordService: DiscordService
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown'; // header personalizado
    const signature = req.header('x-hub-signature-256') ?? 'unknown'; // header personalizado
    const payload = req.body;

    let message: string = '';

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
        break;
      case 'issues':
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown event '${githubEvent}'`;
        break;
    }

    console.log({ message });

    this.discordService
      .notify(message)
      .then(() => res.status(202).send('Accepted'))
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  };
}
