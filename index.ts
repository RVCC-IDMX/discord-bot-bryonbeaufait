import DiscordJS, { Intents, ThreadChannel } from 'discord.js';
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
    message
      .reply('pong')
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
    message.react('🏓').then(console.log).catch(console.error);
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'cowsay') {
    message
      .reply(`\`\`\`${cowsay.say({ text: 'Hello Professor Teeters' })}\`\`\``)
      .then(() => console.log(`Replied to messgage "${message.content}"`))
      .catch(console.error);
    message.react('🐮').then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
