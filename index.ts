import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
import * as unicodeEmoji from 'unicode-emoji';

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    });
    message.react('🏓').catch(console.error);
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'cowsay') {
    message.reply({
      content: `\`\`\`${cowsay.say({ text: 'Hello Professor Teeters' })}\`\`\``,
    });
    message.react('🐮').catch(console.error);
  }
});

client.login(process.env.TOKEN);
