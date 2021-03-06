import DJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

// const PREFIX = process.env.PREFIX || null;
// const CHANNELS = process.env.CHANNELS || null;

// if (!PREFIX) {
//   console.error('PREFIX is not defined');
//   process.exit(1);
// }

// if (!CHANNELS) {
//   console.error('CHANNELS is not defined');
//   process.exit(1);
// }

// const channels = CHANNELS.split(',');
// console.table(channels);

const client = new DJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  let handler = require('./command-handler');
  if (handler.default) handler = handler.default;

  handler(client);
  // console.log('The bot is ready');
});

// client.on('messageCreate', (message) => {
//   if (!channels.includes(message.channel.id)) return;
//   if (!message.content.startsWith(`${PREFIX}`)) return;
//   // const args = message.content.toLowerCase().slice().trim().split(/ /);
//   // const command = args.reverse().shift()!;
//   const args = message.content
//     .toLowerCase()
//     .substring(PREFIX.length!)
//     .slice()
//     .trim()
//     .split(/ /);
//   const command = args.shift()!;
//   console.log(command);
//   if (command === 'ping') {
//     message
//       .reply('pong')
//       .then(() => console.log(`Replied to message "${message.content}"`))
//       .catch(console.error);
//     message.react('🏓').then(console.log).catch(console.error);
//   }
//   if (command === 'cowsay') {
//     message.react('🐮').then(console.log).catch(console.error);
//     const output = cowsay(args[0]);
//     message.reply(output).then(console.log).catch(console.error);
//   }
// });

client.login(process.env.TOKEN);
