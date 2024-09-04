import TelegramBot from 'node-telegram-bot-api';
import * as lastSeen from './store/store.lastseen';
import * as offline from './store/store.offline';
import * as util from './util';

if (!process.env.TELEGRAM_CHATID || !process.env.TELEGRAM_TOKEN) {
  process.exit(1);
}

const chatID = process.env.TELEGRAM_CHATID;
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg: TelegramBot.Message): void => {
  if ((Date.now() - msg.date * 1000) > 5000) {
    bot.sendMessage(msg.chat.id, 'blub');
  }

  if (msg.text == '/status') {
    bot.sendMessage(msg.chat.id, lastSeen.keys().map(server => {
      if (offline.contains(server)) {
        return `\u{2757} Server "${server}" ist offline seit ${util.formatDate(offline.get(server))}!`;
      } else {
        return `\u{2705} Server "${server}" ist online!`;
      }
    }).join('\r\n'));
  } else if (msg.text == '/clear') {
    lastSeen.clear();
    offline.clear();
    bot.sendMessage(msg.chat.id, '\u{1F44D} zurückgesetzt!');
  }
});

export const sendMessage = (message: string): void => {
  bot.sendMessage(chatID, message);
}

// https://api.telegram.org/bot{TOKEN}/getUpdates