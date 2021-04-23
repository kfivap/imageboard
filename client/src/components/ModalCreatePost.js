import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import CreatePost from "./CreatePost";
import {Context} from "../index";

const ModalCreatePost = observer(() => {
    const {board} =useContext(Context)
    // console.log(board.showCreatePost)
    if(!board.showCreatePost){
        return null
    }
    return (
        <div className={'modalPost'}>
            <CreatePost showBoolean={true}/>
        </div>
    );
})

export default ModalCreatePost;