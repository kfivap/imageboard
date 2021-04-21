const Router = require('express')
const router = new Router()
const threadController = require('../controllers/threadController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', threadController.Create)
router.get('/get', threadController.Read)
router.put('/update', threadController.Update)
router.delete('/delete', threadController.Delete)



module.exports = router