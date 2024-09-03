import TelegramBot from 'node-telegram-bot-api';

if (!process.env.TELEGRAM_CHATID || !process.env.TELEGRAM_TOKEN) {
  process.exit(1);
}
const chatID = process.env.TELEGRAM_CHATID;
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: false });

export const sendMessage = (message: string): void => {
  bot.sendMessage(chatID, message);
}