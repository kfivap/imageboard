const Router = require('express')
const router = new Router()
const boardController = require('../controllers/boardController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', boardController.Create)
router.get('/get', boardController.Read)
router.get('/getInfo', boardController.GetBoardInfo)
router.put('/update', boardController.Update)
router.delete('/delete', boardController.Delete)
router.get('/total', boardController.Total)



module.exports = router