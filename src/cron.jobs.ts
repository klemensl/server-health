import cron from 'node-cron';
import * as lastSeen from './store/store.lastseen';

export const startAllJobs = () => {
  cron.schedule('*/1 * * * *', () => {
    Object.keys(lastSeen.get()).forEach(server => {
      console.log('last seen:', server, lastSeen.get()[server]);
    });
  });
  console.log('Cron-Jobs started');
};