import { Telegraf } from 'telegraf';
import 'dotenv/config';

const TOKEN = process.env.TELEGRAM_TOKEN || 'ваш_токен_бота';
const bot = new Telegraf(TOKEN);

const web_link = 'https://shilllo.github.io/mood-tracker/';

bot.telegram.setChatMenuButton({
    menu_button: {
        type: 'web_app',
        text: 'Mood Tracker',
        web_app: { url: web_link },
    },
});

bot.start((ctx) =>
    ctx.reply('Нажмите кнопку ниже, чтобы открыть веб-приложение', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Mood Tracker', web_app: { url: web_link } }],
            ],
        },
    }),
);

// Настройка Webhook
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.RENDER_EXTERNAL_URL;

if (!DOMAIN) {
    console.error('Ошибка: DOMAIN (RENDER_EXTERNAL_URL) не задан.');
    process.exit(1);
}

bot.launch({
    webhook: {
        domain: DOMAIN,
        port: PORT,
    },
});

console.log(`Бот запущен через Webhook на ${DOMAIN}`);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
