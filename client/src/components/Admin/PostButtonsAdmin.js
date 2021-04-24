import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deletePost} from "../../http/PostAPI";

const PostButtonsAdmin = observer(({postId}) => {
    const {user} =useContext(Context)
    // console.log(postId)

    const deleteClickHandler = async ()=>{
         await deletePost(postId)
    }

    if(user?.userRole ==='ADMIN' || user?.userRole ==='MODERATOR'){
    return (
        <span>
            <button className={'removeButton'}
            onClick={deleteClickHandler}
            >Remove</button>
        </span>
    )} else {
        return null
    }
});

export default PostButtonsAdmin;