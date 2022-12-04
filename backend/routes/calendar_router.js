const Router = require('express');
const router = new Router();
const calendarController = require('../controllers/calendar_controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, calendarController.get_calendars);
router.post('/', authMiddleware, calendarController.create_calendar);
router.get('/link/:id', authMiddleware, calendarController.get_create_link);
router.patch('/:id', authMiddleware, calendarController.update_calendar);
router.delete('/:id', authMiddleware, calendarController.delete_calendar);

module.exports = router;