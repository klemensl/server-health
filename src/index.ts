// @ts-ignore
import customEnv from 'custom-env';
import commandLineArgs from 'command-line-args';

const options = commandLineArgs([{
  name: 'env',
  type: String
}], { partial: true });

if (options.env) {
  customEnv.env(options.env);
}


import Koa from 'koa';
import koaLogger from 'koa-logger';
import koaBody from 'koa-body';

const app = new Koa();

if (process.env.NODE_ENV != 'production') {
  app.use(koaLogger((str, args) => {
    if (args[1] != 'OPTIONS') {
      if (args[3] == undefined) {
        console.log(`[KOA] --> ${args[1]} ${args[2]}`);
      } else {
        console.log(`[KOA] <-- ${args[3]} ${args[1]} ${args[2]} ${args[4]}`);
      }
    }
  }));
}

app.use(koaBody({}));

import commonRouter from './routes/routes.common';
import statusRouter from './routes/routes.status';

app.use(commonRouter.routes());
app.use(statusRouter.routes());

import * as cronJobs from './cron.jobs';
import * as telegram from './bot.telegram';

const PORT = process.env.PORT || 1338;
const server = app.listen(PORT, () => {
  console.info('Server listening on port:', PORT);
  cronJobs.startAllJobs();
  telegram.sendMessage('A87 Service-Health up and running!');
});



module.exports = server;