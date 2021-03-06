import React, {useContext, useEffect, useState} from 'react';
import {parseDate} from "../functions/parseDate";
import {useHistory} from "react-router-dom";
import {getPreview} from "../http/PostAPI";
import ImageComponent from "./ImageComponent";
import ThreadPosts from "./ThreadPosts";
import {Context} from "../index";
import ThreadButtonsAdmin from "./Admin/ThreadButtonsAdmin";

const ThreadPreview = ({threadInfo}) => {

    const [posts, setPosts] = useState()
    const [opPost, setOpPost] = useState()
    const [media, setMedia] = useState()

    useEffect(() => {
        async function fetchData() {

            const data = await getPreview(threadInfo.id)


            setPosts(data.posts)
            setOpPost(data.opPost)

            if (data?.opPost?.media) {
                setMedia(JSON.parse(data?.opPost?.media))
            }
            // setMedia(JSON.parse(data?.posts?.media))
            // console.log(data)

        }

        fetchData()


    }, [])

    const history = useHistory()

    const {board} = useContext(Context)
    const CreatePostHandler = (id) => {
        // console.log(opPost.threadId)
        board.setCreatePostThreadId(opPost.threadId)
        board.setShowCreatePost(true)
        if (board.createPostText === '') {
            // console.log(1)
            board.setCreatePostText(board.createPostText + '>>' + id + '\n')

        } else {
            // console.log(3)
            board.setCreatePostText(board.createPostText + '\n>>' + id)

        }
    }
    // console.log(posts)
    return (
        <div className={'threadPreview'}>
            <div className={'opPost'}>
                {opPost?.author} &nbsp;
                {parseDate(threadInfo.createdAt)}
                &nbsp;

                <span className={"appLink"}
                            onClick={() => CreatePostHandler(opPost?.id)}
            >№{opPost?.id}</span>
                &nbsp;
                <span className={'postIndex'}>#0(OP)</span>

                <span onClick={() => history.push(window.location.pathname + '/res/' + threadInfo.id)}> To thread</span>
<ThreadButtonsAdmin threadId={threadInfo.id} bump={threadInfo.bump}/>
                <div className={'opText'}>{opPost?.text}</div>


                {media ? media.map((img, index) =>
                        <ImageComponent key={index} src={process.env.REACT_APP_API_URL + img}/>
                    )

                    :
                    null
                }
            </div>
            <div className={'previewPosts'}>
            {posts?.rows?.map((post, index) =>{

                return(
                <ThreadPosts post={post} key={index} index={posts.count-2+index}/>)
            })
            }
            </div>

        </div>
    );
};

export default ThreadPreview;