import { Telegraf } from 'telegraf';
const TOKEN = '7866412399:AAFYKSbU3J7z_CFekLO9HKQW9NKAHFwT1Aw';
const bot = new Telegraf(TOKEN);

const web_link = 'https://shilllo.github.io/mood-tracker/';

bot.start((ctx) =>
    ctx.reply('Нажмите кнопку ниже, чтобы открыть веб-приложение', {
        reply_markup: {
            keyboard: [
                [{ text: 'Open Mood Tracker', web_app: { url: web_link } }],
            ],
        },
    }),
);

bot.launch();
