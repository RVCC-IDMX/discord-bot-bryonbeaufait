import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

// generate a random number between 0 and the max length the array quotes
let quote = getRandomInt(0, quotes.length);
// use that random number to find a random object in the array quotes
const randomQuote = quotes[quote];

let opts: IOptions = {
  // use const randomQuote to output the quote and author
  text: `${randomQuote.quote} - ${randomQuote.author}`,
  r: true,
};

export default function () {
  let str = cowsay.say(opts);
  str = str.replace(/```/g, "'''");
  if (str.length > 1994) {
    str = str.substring(0, 1994);
  }
  return `\`\`\`${str}\`\`\``;
}
