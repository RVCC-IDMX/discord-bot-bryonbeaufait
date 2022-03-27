import DiscordJS, { Intents, ThreadChannel } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (!channels.includes(message.channel.id)) return;
  if (!message.content.startsWith(`${process.env.PREFIX}`)) return;
  const args = message.content.toLowerCase().slice().trim().split(/ /);
  const command = args.reverse().shift()!;
  console.log(command);
  if (command === 'ping') {
    message
      .reply('pong')
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
    message.react('🏓').then(console.log).catch(console.error);
  }
  if (command === 'cowsay') {
    message.react('🐮').then(console.log).catch(console.error);
    const output = cowsay();
    message.reply(output).then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
