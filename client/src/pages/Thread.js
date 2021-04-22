import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getPosts} from "../http/PostAPI";
import ThreadPosts from "../components/ThreadPosts";
import CreatePost from "../components/CreatePost";

const Thread = observer(() => {

    const [posts, setPosts] = useState(null)


    useEffect(() => {

        async function fetchData() {
            let data = await getPosts(window.location.pathname.split('/')[3])
            setPosts(data)
            // console.log()
        }
        fetchData()

    }, [])


    console.log(posts?.posts.rows)


    return (
        <div>

            Thread {window.location.pathname}
            {posts?.posts.rows.map((post, index)=>
                <ThreadPosts key={index} post={post} index={index}/>

            )}
            <CreatePost/>
        </div>
    );
})

export default Thread;