const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    nick: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})




const Board = sequelize.define('board', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    shortName: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.TEXT, allowNull: false},
})



const Thread = sequelize.define('thread', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    opPost: {type: DataTypes.STRING},
    bump: {type: DataTypes.DATE, defaultValue: Date.now()}

})


const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING, defaultValue: 'ANON'},
    authorIp: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    media: {type: DataTypes.TEXT},
})

const UserBoard = sequelize.define('user_board', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


Board.hasMany(Thread)
Thread.belongsTo(Board)

Thread.hasMany(Post)
Post.belongsTo(Thread)

User.belongsToMany(Board, {through: UserBoard})
Board.belongsToMany(User, {through: UserBoard})

module.exports = {
User, Board, Thread, Post, UserBoard
}