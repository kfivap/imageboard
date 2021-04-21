import {makeAutoObservable} from "mobx";

export default class UserStore {


    constructor() {
        this._boardId = false
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._isAuth = user
    }
    setUserId(id){
        this._userId = id
    }
    setUserBio(bio){
        this._userBio = bio
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }

    get userId(){
        return this._userId
    }
    get userBio(){
        return this._userBio
    }
}