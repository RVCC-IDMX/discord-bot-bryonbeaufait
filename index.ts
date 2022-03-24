import DiscordJS, { Intents, ThreadChannel } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';

dotenv.config();

let opts: IOptions = {
  text: 'Hello Professor Teeters',
  e: 'Oo',
  T: 'Y',
  f: 'smiling-octopus',
  r: false,
  y: false,
};

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
      .reply(`\`\`\`${cowsay.say(opts)}\`\`\``)
      .then(() => console.log(`Replied to messgage "${message.content}"`))
      .catch(console.error);
    message.react('🐮').then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
