const {Thread, User, Board, Post} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')
const uuid = require('uuid')
const path = require('path')
const deletePost = require("../functions/deletePost")

class threadController {
    async Create(req, res, next){
        try{
            const {author, text, media, board} = req.body
            const authorIp = req.ip

            if(text.trim() === ''){
               return res.status(400).json({message:'Text not stated'})
            }


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

            if(namesArray.length===0){
                return res.status(400).json({message: '0 files error'})
            }

            let newThread = await Thread.create({
                author, boardId: boardExist.id, bump: Date.now()
            })

            let opPost = await Post.create({
                author, text, media: JSON.stringify(namesArray), threadId: newThread.id, authorIp,
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
            if(!boardFind){
                return res.status(404).json({message: 'board not found'})
            }

            let threads = await Thread.findAndCountAll({
                where:{
                  boardId: boardFind.id
                },
                order: [['bump', 'DESC']]
            })
            return res.json({threads})
        } catch (e) {
            return res.status(500).json({
                message:e.message,
            })
        }

    }

    async GetOneThread(req, res){
        try{
            const {threadId} = req.query
            if(!threadId){
                return res.status(400).json({message: "threadId not stated"})
            }
            const thread = await Thread.findOne({where:{id: threadId}})

            return res.json({thread})

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
        const {threadId} = req.query
        if(!threadId){
            return res.status(400).json({message: 'threadId not stated'})
        }
        console.log(threadId)
        let userId = checkUserMiddleware(req).id
        if(!userId){
            return res.status(403).json({message: 'Forbidden'})
        }
        let data = await User.findOne({
            where: {
                id: userId
            }
        })

        if (data.role !== 'ADMIN' && data.role !== 'MODERATOR' ) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const threadPosts = await Post.findAll({
            where:{threadId},
            attributes: ['id']
        })
        const threadPostsJSON =JSON.parse(JSON.stringify(threadPosts))
        threadPostsJSON.map(async (obj)=>{
          await deletePost(obj.id)

        })

        const deleted = await Thread.destroy({where:{id: threadId}})

        return res.json(deleted)
    }


    async PinThread(req, res){
        const {threadId} = req.body
        if(!threadId){
            return res.status(400).json({message: 'threadId not stated'})
        }
        // console.log(threadId)
        let userId = checkUserMiddleware(req).id
        if(!userId){
            return res.status(403).json({message: 'Forbidden'})
        }

        let candidateThread = await Thread.findOne({
            where: {id: threadId}
        })

        //already pinned?
        if(candidateThread.bump>Date.now()*1.1){
            //unPin

            const lastPost = await Post.findOne({
                where:{threadId},
                order: [['id', 'DESC']]
            })

            let unpinned = await Thread.update(
                {bump: lastPost.createdAt},
                {where: {id: threadId}}
            )
            return res.json({unpinned})

        } else {
            //pin
            let pinned = await Thread.update(
                {bump: Date.now()*2},
                {where: {id: threadId}}
            )
            return res.json({pinned})

        }

    }



}

module.exports = new threadController()