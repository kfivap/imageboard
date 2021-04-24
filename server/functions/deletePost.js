const { Post} = require('../models/models')
const path = require('path')
const fs = require('fs')

module.exports = deletePostAPI = async (postId)=>{
    const candidateDelete = await Post.findOne({
        where: {id: postId}
    })
    if(!candidateDelete){
        return (0)
    }

    const mediaList = JSON.parse(candidateDelete.media)
    mediaList.map(media=>{
        const filePath = path.resolve(__dirname, '..', 'static', media)

        fs.unlink(filePath, (err) => {
            if(err){
                console.error(err)
            } else {
                // console.log('removed')
            }
        })
    })

    const deleted = await Post.destroy({
        where: {id: postId}
    })
    return deleted
}


