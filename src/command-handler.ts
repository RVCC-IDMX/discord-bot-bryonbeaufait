import { Client } from 'discord.js';
import fs from 'fs';
import getFiles from './get-files';
import dotenv from 'dotenv';

dotenv.config();

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

export default (client: Client) => {
  const commands = {} as {
    [key: string]: any;
  };

  const commandFiles = getFiles(src, './commands', suffix);
  console.log(commandFiles);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(suffix, '');

    commands[commandName.toLowerCase()] = commandFile;

    console.log(commands);
  }

  client.on('messageCreate', (message) => {
    const PREFIX = process.env.PREFIX || null;
    const CHANNELS = process.env.CHANNELS || null;

    if (!PREFIX) {
      console.error('PREFIX is not defined');
      process.exit(1);
    }

    if (!CHANNELS) {
      console.error('CHANNELS is not defined');
      process.exit(1);
    }

    const channels = CHANNELS.split(',');
    // console.table(channels);

    if (!channels.includes(message.channel.id)) return;
    if (!message.content.startsWith(`${PREFIX}`)) return;

    if (message.author.bot || !message.content.startsWith('bb!')) {
      return;
    }

    const args = message.content.slice(3).split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    if (!commands[commandName]) {
      return;
    }
    console.log(commandName);
    try {
      commands[commandName].callback(message, ...args);
    } catch (error) {
      console.error(error);
    }
  });
};
