import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ReplyPostPreview from "./ReplyPostPreview";
import {Context} from "../../index";
import {toJS} from "mobx";
import {getOnePost} from "../../http/PostAPI";

const ReplyPreviewModal = observer(({reply, index}) => {

    const [show, setShow] = useState(false)
    const [fetchedPost, setFetchedPost] = useState({})
    const mouseOverHandler = (e) => {
        setShow(true)
    }
    const mouseLeaveHandler = (e) => {
        setShow(false)
    }
    const {board} = useContext(Context)


    let postOne, count
    const replyPost = parseInt(reply.slice(2))
    useEffect(() => {
        if (window.location.pathname.length < 3 &&!show) {
            async function fetchPost() {
                const data = await getOnePost(replyPost)
                setFetchedPost(data)

            }

            fetchPost()
        }

    }, [])
    if (window.location.pathname.length > 3) {
        let posts = toJS(board.postsList).posts.rows


        count = 0
        let countStop = false
        postOne = posts.filter(post => {
            if (!countStop) {
                count++
            }
            if (post.id === replyPost) {
                countStop = true
            }
            return post.id === replyPost
        })[0]
    }

    return (
        <span
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}>
            {show ? <ReplyPostPreview post={postOne || fetchedPost} index={count - 1}/> : null}
            <a href={'#'+replyPost} className={'appLink'}>{reply}</a>
        </span>
    );
})

export default ReplyPreviewModal;