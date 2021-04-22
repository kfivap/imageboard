import {makeAutoObservable, runInAction} from "mobx";
import {getPosts} from "../http/PostAPI";
import {NOTFOUND_ROUTE} from "../utils/consts";

export default class UserStore {


    constructor() {
        this._expandedMedia = ''
        this._showCreatePost = false
        this._createPostText = ''
        this._postsList = []
        makeAutoObservable(this)
    }

    setExpandedMedia(src){
        this._expandedMedia = src
    }
    setShowCreatePost(boolean){
        this._showCreatePost = boolean
    }
    setCreatePostText(text){
        this._createPostText = text
    }
    setPostList(list){
        this._postsList = list
    }

     async fetchPostList(link){
            try{
                let data = await getPosts(link)
                console.log(data)
                runInAction(() =>{
                this._postsList = data
                })
            } catch (e) {
                console.log(e)

            }

    }


    get expandedMedia(){
        return this._expandedMedia
    }
    get showCreatePost(){
        return this._showCreatePost
    }
    get createPostText(){
        return this._createPostText
    }
    get postsList(){
        return this._postsList
    }

}