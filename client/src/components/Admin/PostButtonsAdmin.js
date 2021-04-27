import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deletePost} from "../../http/PostAPI";

const PostButtonsAdmin = observer(({postId}) => {
    const {user} =useContext(Context)
    // console.log(postId)

    const [deleted, setDeleted] = useState(false)

    const deleteClickHandler = async ()=>{
         await deletePost(postId)
        setDeleted(true)
    }


    if(user?.userRole ==='ADMIN' || user?.userRole ==='MODERATOR'){
    return (
        <span>
            <button className={'removeButton'}
            onClick={deleteClickHandler}
            >{deleted? "Post Deleted": "Remove"}</button>

        </span>
    )} else {
        return null
    }
});

export default PostButtonsAdmin;