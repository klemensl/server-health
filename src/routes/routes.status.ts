import type { ParameterizedContext } from 'koa';
import Router from 'koa-router';

const router = new Router();

const BASE_URL = '/api';

const lastSeenMap: { [key: string]: Date } = {};

router.get(`${BASE_URL}/ping`, (ctx: ParameterizedContext) => {
  const server = ctx.request.query.server;
  ctx.assert(typeof server === 'string', 500);
  
  lastSeenMap[server] = new Date();
  ctx.body = lastSeenMap;
  ctx.status = 200;
});

router.get(`${BASE_URL}/lastSeen`, (ctx: ParameterizedContext) => {
  ctx.body = lastSeenMap;
});

export = router;