import type { ParameterizedContext } from 'koa';
import Router from 'koa-router';

const router = new Router();

const BASE_URL = '/api/info';


router.get(`${BASE_URL}/version`, (ctx: ParameterizedContext) => {
  ctx.body = "DAS IST EIN TEST";
});

export = router;