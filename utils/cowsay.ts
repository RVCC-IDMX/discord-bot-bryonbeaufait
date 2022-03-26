import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';

let opts: IOptions = {
  text: 'Hello Professor Teeters',
  e: 'Oo',
  T: 'Y',
  f: 'mona-lisa',
  r: true,
  y: false,
};

export default function () {
  let str = cowsay.say(opts);
  str = str.replace(/```/g, "'''");
  if (str.length > 1994) {
    str = str.substring(0, 1994);
  }
  return `\`\`\`${str}\`\`\``;
}
