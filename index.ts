import DiscordJS, { Intents, ThreadChannel } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  console.log(message.content);
  if (message.content === 'ping') {
    message
      .reply('pong')
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
    message.react('🏓').then(console.log).catch(console.error);
  }
  if (message.content === 'cowsay') {
    message.react('🐮').then(console.log).catch(console.error);
    const output = cowsay();
    message.reply(output).then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
