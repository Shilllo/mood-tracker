import { Telegraf } from 'telegraf';
const TOKEN = '7866412399:AAFYKSbU3J7z_CFekLO9HKQW9NKAHFwT1Aw';
const bot = new Telegraf(TOKEN);

const web_link = 'https://jovial-beignet-063442.netlify.app/';

bot.start((ctx) =>
    ctx.reply('Press the button below to open the web app', {
        reply_markup: {
            keyboard: [[{ text: 'EmoTracker', web_app: { url: web_link } }]],
        },
    }),
);

bot.launch();
