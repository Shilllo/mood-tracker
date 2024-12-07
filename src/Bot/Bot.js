// import { Telegraf } from 'telegraf';
const TOKEN = '7866412399:AAFYKSbU3J7z_CFekLO9HKQW9NKAHFwT1Aw';
// const bot = new Telegraf(TOKEN);

// const web_link = 'https://shilllo.github.io/mood-tracker/';

// bot.start((ctx) =>
//     ctx.reply('Welcome :)))))', {
//         reply_markup: {
//             keyboard: [[{ text: 'web app', web_app: { url: web_link } }]],
//         },
//     }),
// );

// bot.launch();

import { Telegraf } from 'telegraf';

const bot = new Telegraf(TOKEN); // Токен из переменной окружения

const web_link = 'https://shilllo.github.io/mood-tracker/'; // Ваш деплой на GitHub Pages

bot.start((ctx) =>
    ctx.reply('Нажмите кнопку ниже, чтобы открыть веб-приложение', {
        reply_markup: {
            keyboard: [
                [{ text: 'Открыть приложение', web_app: { url: web_link } }],
            ],
        },
    }),
);

bot.launch();
console.log('Telegram-бот запущен!');

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
