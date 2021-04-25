import React from 'react';
import {observer} from "mobx-react-lite";
import ThreadPosts from "../ThreadPosts";

const ReplyPostPreview = observer(({post, index}) => {
    // console.log(post)
    return (
        <div className={'replyPostPreview'}
        >
<ThreadPosts post={post} index={index}/>
        </div>
    );
})

export default ReplyPostPreview;