const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const boardRouter = require('./boardRouter')
const threadRouter = require('./threadRouter')
const postRouter = require('./postRouter')



router.use('/user', userRouter)
router.use('/board', boardRouter)
router.use('/thread', threadRouter)
router.use('/post', postRouter)



module.exports = router