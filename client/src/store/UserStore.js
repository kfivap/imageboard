import {makeAutoObservable} from "mobx";

export default class UserStore {


    constructor() {
        this._isAuth = false

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


    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }

    get userId(){
        return this._userId
    }

}