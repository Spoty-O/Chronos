const Router = require('express');
const router = new Router();
const eventController = require('../controllers/event_controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, eventController.get_events);
router.post('/:id', authMiddleware, eventController.create_event);
router.get('/:id', authMiddleware, eventController.get_create_link);
router.patch('/:id', authMiddleware, eventController.update_event);
router.delete('/:id', authMiddleware, eventController.delete_event);

module.exports = router;