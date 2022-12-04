const Router = require('express');
const router = new Router();
const testRouter = require('./testRouter');
const authRouter = require('./auth_router');
const calendarRouter = require('./calendar_router');
const eventRouter = require('./event_router');

router.use('/test', testRouter);
router.use('/auth', authRouter);
router.use('/calendar', calendarRouter);
router.use('/event', eventRouter);

module.exports = router;