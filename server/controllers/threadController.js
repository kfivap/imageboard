const {Thread, User, Board, Post} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')
const uuid = require('uuid')
const path = require('path')

class threadController {
    async Create(req, res, next){
        try{
            const {author, text, media, board} = req.body
            const authorIp = req.ip

            if(!board){
                res.status(400).json({message:'BoardId not stated'})
            }
            let boardExist = await Board.findOne({
                where: {shortName: board}
            })

            if(!boardExist){
                return res.status(400).json({message:'Board not exist'})
            }

            //

            let newThread = await Thread.create({
                author, boardId: boardExist.id
            })



            let namesArray=[]
            const pushNamesArray = ()=>{
                let filename = uuid.v4() + '.jpg'
                namesArray.push(filename)
                return filename
            }
            try { //shit code be like

                const {media0, media1, media2, media3} = req.files

               await media0?.mv(path.resolve(__dirname, '..', 'static', pushNamesArray()))
                await media1?.mv(path.resolve(__dirname, '..', 'static', pushNamesArray()))
                await media2?.mv(path.resolve(__dirname, '..', 'static', pushNamesArray()))
                await media3?.mv(path.resolve(__dirname, '..', 'static', pushNamesArray()))

                console.log(namesArray)


            } catch (e) {
                console.log(e.message)
            }

            let opPost = await Post.create({
                author, text, media: JSON.stringify(namesArray), threadId: newThread.id, authorIp
            })

            return res.json(newThread)
        } catch (e) {
            // console.log(e.message)
            return res.status(500).json({
                message:e.message,
            })
        }

    }






    async Read(req, res, next){
        try {
            const {board} = req.query
            if(!board){
                return res.status(400).json({message: "boardId not stated"})
            }

            let boardFind = await Board.findOne({where: {shortName: board}})

            let threads = await Thread.findAndCountAll({where:{
                  boardId: boardFind.id
                }})
            return res.json({threads})
        } catch (e) {
            return res.status(500).json({
                message:e.message,
            })
        }

    }
    async Update(req, res, next){
        return res.json({message: 'Route works but do nothing'})
    }
    async Delete(req, res, next){
        return res.json({message: 'Route works but do nothing'})
    }



}

module.exports = new threadController()