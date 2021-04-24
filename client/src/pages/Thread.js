import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";

import ThreadPosts from "../components/ThreadPosts";
import CreatePost from "../components/CreatePost";
import {NOTFOUND_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import {Context} from "../index";
import {toJS} from "mobx";
import ThreadButtonsAdmin from "../components/Admin/ThreadButtonsAdmin";

const Thread = observer(() => {


    const history = useHistory()
    const {board} =useContext(Context)

const threadId = window.location.pathname.split('/')[3]
    console.log(threadId)
    useEffect(() => {

        async function fetchData() {
            try{
                // let data = await getPosts(window.location.pathname.split('/')[3])
                await board.fetchPostList(window.location.pathname.split('/')[3])
                // board.setPostList(data)
            } catch (e) {
                console.log(e)
                if(e.message === 'Request failed with status code 404'){
                    history.push(NOTFOUND_ROUTE)
                }
            }


        }
        fetchData()

    }, [])



    // console.log(toJS(board.postsList.posts))


    return (
        <div>

            Thread {window.location.pathname}
            <ThreadButtonsAdmin threadId={threadId}/>

            {toJS(board.postsList.posts)?.rows.map((post, index)=>
                <ThreadPosts key={index} post={post} index={index}/>

            )}
            <br/>
            <CreatePost fromBottom={true}/>

            <br/>
            <br/>

        </div>
    );
})

export default Thread;