import * as crypto from 'crypto';
import { Request, RequestHandler } from 'express';

import { envs } from '@/config';

const WEBHOOK_SECRET = envs.SECRET_TOKEN;

const verify_signature = (req: Request) => {
  try {
    const signature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');
    const xHubSignature = req.header('x-hub-signature-256') ?? '';

    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted = Buffer.from(xHubSignature, 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (error) {
    return false;
  }
};

export class GithubSha256Middleware {
  static verifySignature: RequestHandler = (req, res, next) => {
    if (!verify_signature(req)) {
      res.status(401).send('Unauthorized');
      return;
    }

    next();
  };
}
