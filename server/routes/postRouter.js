const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', postController.Create)
router.get('/get', postController.Read)
router.put('/update', postController.Update)
router.delete('/delete', postController.Delete)
router.get('/getPreview', postController.ReadPreview)



module.exports = router