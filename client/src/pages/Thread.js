import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

import ThreadPosts from "../components/ThreadPosts";
import CreatePost from "../components/CreatePost";
import {NOTFOUND_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import {Context} from "../index";
import {toJS} from "mobx";
import ThreadButtonsAdmin from "../components/Admin/ThreadButtonsAdmin";
import {getOneThread} from "../http/ThreadAPI";

const Thread = observer(() => {


    const history = useHistory()
    const {board} =useContext(Context)
    const [threadInfo, setThreadInfo] =useState()

const threadId = window.location.pathname.split('/')[3]
    // console.log(threadId)
    useEffect(() => {

        async function fetchData() {
            try{
                // let data = await getPosts(window.location.pathname.split('/')[3])
               let data= await board.fetchPostList(window.location.pathname.split('/')[3])
                let threadData = await getOneThread(threadId)
                setThreadInfo(threadData)

                if(!toJS(board.postsList).posts){
                    history.push(NOTFOUND_ROUTE)
                }
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
            <ThreadButtonsAdmin
                threadId={threadId}
                bump={threadInfo?.thread?.bump}
            />

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