import { GitHubIssuePayload, GitHubStarPayload } from '@/interfaces';

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStarPayload): string {
    const { action, sender, repository } = payload;
    let message: string = '';

    return (message = `User ${sender.login} ${action} start on ${repository.full_name}`);
  }

  onIssue(payload: GitHubIssuePayload): string {
    const { action, issue, repository } = payload;

    if (action === 'opened') {
      return `An issue was opened with this title '${issue.title}' on ${repository.full_name}`;
    }
    if (action === 'closed') {
      return `An issue was closed by ${issue.user.login} on '${repository.full_name}'`;
    }
    if (action === 'reopened') {
      return `An issue was reopened by ${issue.user.login} on '${repository.full_name}'`;
    }

    return `Unhandle action for the issue event ${action}`;
  }
}
