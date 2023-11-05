import { envs } from '@/config';

export class DiscordService {
  // otra forma de indicar q es 1 dep q se require. NO dep Oculta
  private readonly discordWebhookurl = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      // embeds: [{image: {url: 'https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif'}}],
    };

    const res = await fetch(this.discordWebhookurl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error('Error sending message to discord');
    }

    return true;
  }
}
