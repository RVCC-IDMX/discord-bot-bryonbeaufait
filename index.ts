import DiscordJS, { Intents, ThreadChannel } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';

dotenv.config();

let opts: IOptions = {
  text: 'Hello Professor Teeters',
  e: 'Oo',
  T: 'Y',
  f: 'mona-lisa',
  r: true,
  y: false,
};

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
    let output = cowsay.say(opts);
    output = output.replace(/```/g, "'''");
    if (output.length > 1994) {
      //output = 'The image is too big, try again';
      output = output.substring(0, 1994);
    }
    message
      .reply(`\`\`\`${output}\`\`\``)
      .then(() => console.log(`Replied to messgage "${message.content}"`))
      .catch(console.error);
    message.react('🐮').then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
