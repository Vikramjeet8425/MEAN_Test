const router = require('express').Router();
const ctrl = require('../controllers/orderController');

router.post('/', ctrl.createOrder);
router.get('/getAll', ctrl.getAll);
router.get('/:id', ctrl.getOrder);
router.put('/:id', ctrl.updateOrder);
router.delete('/:id', ctrl.deleteOrder);

module.exports = router;
