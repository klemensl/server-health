import type { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import * as lastSeen from '../store/store.lastseen';
import * as offline from '../store/store.offline';

const router = new Router();

const BASE_URL = '/api';

router.get(`${BASE_URL}/ping`, (ctx: ParameterizedContext) => {
  const server = ctx.request.query.server;
  ctx.assert(typeof server === 'string', 500);

  lastSeen.add(server);
  ctx.body = lastSeen.dump();
  ctx.status = 200;
});

router.get(`${BASE_URL}/lastseen`, (ctx: ParameterizedContext) => {
  ctx.body = lastSeen.dump();
});

router.get(`${BASE_URL}/clear`, (ctx: ParameterizedContext) => {
  lastSeen.clear();
  offline.clear();
});

export = router;