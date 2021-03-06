const deletePost = require("../functions/deletePost")

const {Thread, User, Post} = require('../models/models')
const checkUserMiddleware = require('../middleware/checkUserMiddleware')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class postController {
    async Create(req, res, next){
        try{
            const {author, text, media, threadId} = req.body
            const authorIp = req.ip
            if(text.trim() === ''){
                return res.status(400).json({message:'Text not stated'})
            }
            if(!threadId){
                res.status(400).json({message:'threadId not stated'})
            }
            let threadExist = await Thread.findOne({
                where: {id: threadId}
            })
            if(!threadExist){
                return res.status(400).json({message:'thread not exist'})
            }



            console.log(req.files)
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

            let newPost = await Post.create({
                author, text,  media: JSON.stringify(namesArray), threadId, authorIp
            })
            let bumpThread = await Thread.update(
                {bump: Date.now()},
                {where: {id: threadId}}
           )



            return res.json(newPost)
        } catch (e) {
            // console.log(e.message)
            return res.status(500).json({
                message:e.message,
            })
        }

    }


    async Read(req, res, next){
        const {threadId} = req.query
        if(!threadId){
            return res.status(400).json({message: "threadId not stated"})
        }
        let posts = await Post.findAndCountAll({
            where: {threadId},
            order: [['id', 'ASC']]
        })
        if(!posts.count){
            return res.status(404).json({message: "thread not found"})
        }
        return res.json({posts})
    }



    async Update(req, res, next){
        return res.json({message: 'Route works but do nothing'})
    }
    async Delete(req, res, next){
        const {postId}= req.query

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

       const deleted = await deletePost(postId)
        console.log(deleted)



        return res.json(deleted)
    }

    async ReadPreview(req, res, next){
        const {threadId} = req.query
        if(!threadId){
            return res.status(400).json({message: "threadId not stated"})
        }
        let count = await Post.count({
            where:{threadId}
        })
        // console.log(count)

        let minus = 2

        if(count<minus){
            minus=count-1
        }
        if(count===minus){
            minus=1
        }

        // console.log(count, minus)
        let posts = await Post.findAndCountAll({where:{
                threadId
            },
            order: [['id', 'ASC']]
            , offset: count-minus})
        let opPost = await Post.findOne({where:{threadId}})

        return res.json({posts, opPost})

    }


    async getOnePost(req, res, next){
        const {postId} = req.query
        if(!postId){
            return res.status(400).json({message: "postId not stated"})
        }
        let post = await Post.findOne({
            where:{id: postId}
        })
        return res.json(post)

    }

}

module.exports = new postController()