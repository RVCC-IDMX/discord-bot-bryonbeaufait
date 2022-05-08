import * as cowsay from 'cowsay';
import { Message } from 'discord.js';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';

export default {
  callback: (message: Message, file: string) => {
    // generate a random number between 0 and the max length the array quotes
    let quote = getRandomInt(0, quotes.length);
    // use that random number to find a random object in the array quotes
    const randomQuote = quotes[quote];

    let opts: IOptions = {
      // use const randomQuote to output the quote and author
      text: `${randomQuote.quote} - ${randomQuote.author}`,
    };

    if (file) {
      opts.f = file;
      opts.r = false;
    } else {
      opts.r = true;
    }

    let str = '';
    try {
      str = cowsay.say(opts);
      console.log(`str after cowsay is ${str}`);
    } catch {
      str = 'This is not available';
      console.log(`cowsay had a error`);
    }

    str = str.replace(/```/g, "'''");
    if (str.length > 1994) {
      str = str.substring(0, 1994);
    }
    message.reply(`\`\`\`${str}\`\`\``);
  },
};
