"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = tslib_1.__importStar(require("discord.js"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const cowsay_1 = tslib_1.__importDefault(require("./utils/cowsay"));
dotenv_1.default.config();
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
console.table(channels);
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (!channels.includes(message.channel.id))
        return;
    if (!message.content.startsWith(`${PREFIX}`))
        return;
    const args = message.content
        .toLowerCase()
        .substring(PREFIX.length)
        .slice()
        .trim()
        .split(/ /);
    const command = args.shift();
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
        const output = (0, cowsay_1.default)(args[0]);
        message.reply(output).then(console.log).catch(console.error);
    }
});
client.login(process.env.TOKEN);
