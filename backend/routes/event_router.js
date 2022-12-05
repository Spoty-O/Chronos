const Router = require('express');
const router = new Router();
const eventController = require('../controllers/event_controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, eventController.get_events);
router.get('/holidays', eventController.get_holidays);
router.get('/link/:id', authMiddleware, eventController.get_create_link);
router.post('/:id', authMiddleware, eventController.create_event);
router.patch('/:id', authMiddleware, eventController.update_event);
router.delete('/:id', authMiddleware, eventController.delete_event);

module.exports = router;