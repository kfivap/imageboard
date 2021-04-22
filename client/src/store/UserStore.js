import {makeAutoObservable} from "mobx";

export default class UserStore {


    constructor() {
        this._isAuth = false
        this._userId = null
        this._userRole = null

        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUserId(id){
        this._userId = id
    }
    setUserRole(role){
        this._userRole = role
    }


    get isAuth(){
        return this._isAuth
    }
    get userId(){
        return this._userId
    }
    get userRole(){
        return this._userRole
    }

}