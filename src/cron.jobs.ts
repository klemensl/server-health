import cron from 'node-cron';
import * as lastSeen from './store/store.lastseen';
import * as offline from './store/store.offline';
import * as telegram from './bot.telegram';

const waitForOffline = process.env.OFFLINE_AFTER_MINUTES ? Number(process.env.OFFLINE_AFTER_MINUTES) : 1;
console.info('waitForOffline:', waitForOffline);

export const startAllJobs = () => {
  cron.schedule('*/1 * * * *', () => {
    lastSeen.keys().forEach(server => {
      const timestamp = lastSeen.get(server);
      //console.log(Date.now(), ': last seen:', server, timestamp);
      //console.log(new Date(), ': last seen:', server, new Date(timestamp));

      if ((Date.now() - timestamp) > waitForOffline*60*1000) {
        if (offline.contains(server) == false) {
          offline.add(server);
          telegram.sendMessage(`\u{2757} Server "${server}" ist offline!`);
        }
      } else {
        if (offline.contains(server) == true) {
          offline.remove(server);
          telegram.sendMessage(`\u{2705} Server "${server}" ist wieder verfügbar!`);
        }
      }
    });

    console.debug('serverlist:', lastSeen.dump());
    console.debug('offline   :', offline.dump());
  });

  console.info('Cron-Jobs started');
};