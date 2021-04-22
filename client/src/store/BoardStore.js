import {makeAutoObservable} from "mobx";

export default class UserStore {


    constructor() {
        this._expandedMedia = ''
        makeAutoObservable(this)
    }

    setExpandedMedia(src){
        this._expandedMedia = src
    }

    get expandedMedia(){
        return this._expandedMedia
    }

}