const {Board, User} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')

class boardController {
    async Create(req, res, next) {
        try {
            const {name, shortName, description} = req.body

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


    async getIdByShortName(req, res){
        return
    }

}

module.exports = new boardController()