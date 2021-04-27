

const {Board, User, Post, Thread} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')

class boardController {
    async Create(req, res, next) {
        try {
            const {name, shortName, description} = req.body

            if(!name || !shortName){
                // console.log('here')
                return res.status(400).json({message: 'name or shortName is empty'})
            }


            let userId = checkUserMiddleware(req).id
            let data = await User.findOne({
                where: {
                    id: userId
                }
            })

            if (data.role !== 'ADMIN') {
                return res.status(401).json({message: 'Unauthorized'})
            }



            let newBoard = await Board.create({
                name, shortName, description
            })

            //console.log(name, shortName, description)

            return res.json(newBoard)
        } catch (e) {
            // console.log(e.message)
            return res.status(500).json({
                message: e.message,
                text: 'maybe board already exist'
            })
        }

    }

    async Read(req, res, next) {
        let boards = await Board.findAll()
        return res.json(boards)
    }

    async Update(req, res, next) {
        return res.json({message: 'Route works but do nothing'})
    }

    async Delete(req, res, next) {
        return res.json({message: 'Route works but do nothing'})
    }


    async GetBoardInfo(req, res){
        try {
            const {board} = req.query

            let data = await Board.findOne({where:{shortName: board}})
            return res.json(data)
        } catch (e) {
            // console.log(e.message)
            return res.status(500).json({
                message: e.message,
            })
        }

    }

    async Total(req, res){
        try{
            const post = await Post.findOne({
                order: [['id', "DESC"]]
            })
            const thread = await Thread.findOne({
                order: [['id', "DESC"]]
            })
            const board = await Board.findOne({
                order: [['id', "DESC"]]
            })
            return res.json({
                postCount: post.id,
                threadCount:thread.id,
                boardCount: board.id
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
            })
        }
    }

}

module.exports = new boardController()