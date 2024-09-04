import TelegramBot from 'node-telegram-bot-api';
import * as lastSeen from './store/store.lastseen';
import * as offline from './store/store.offline';

if (!process.env.TELEGRAM_CHATID || !process.env.TELEGRAM_TOKEN) {
  process.exit(1);
}

const chatID = process.env.TELEGRAM_CHATID;
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg: TelegramBot.Message): void => {
  console.log(msg);
  if ((Date.now() - msg.date * 1000) > 5000) {
    bot.sendMessage(msg.chat.id, 'blub');
  }

  if (msg.text == '/status') {
    bot.sendMessage(msg.chat.id, lastSeen.keys().map(server => {
      if (offline.contains(server)) {
        const offlineSince = new Date(offline.get(server));
        return `\u{2757} Server "${server}" ist offline seit ${offlineSince.getDate()}.${offlineSince.getMonth() + 1}.${offlineSince.getFullYear()} ${offlineSince.getHours()}:${offlineSince.getMinutes()}!`;
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