import React, {useEffect, useState} from 'react';
import {parseDate} from "../functions/parseDate";
import {useHistory} from "react-router-dom";
import {getPreview} from "../http/PostAPI";
import ImageComponent from "./ImageComponent";
import ThreadPosts from "./ThreadPosts";
import index from "jwt-decode";

const ThreadPreview = ({threadInfo}) => {

    const [posts, setPosts] = useState()
    const [opPost, setOpPost] = useState()
    const [media, setMedia] = useState()

    useEffect(() => {
        async function fetchData() {

            const data = await getPreview(threadInfo.id)


            setPosts(data.posts)
            setOpPost(data.opPost)
            // console.log(data.opPost)
            if(data?.opPost?.media){
               setMedia(JSON.parse(data?.opPost?.media))
            }
            // setMedia(JSON.parse(data?.posts?.media))
            // console.log(data)

        }

        fetchData()


    }, [])
    // console.log(process.env.REACT_APP_API_URL + JSON.parse(media))
// console.log(media)
    const history = useHistory()
    // console.log(threadInfo)
    return (
        <div>
            <br/>

            {parseDate(threadInfo.createdAt)}
            <span onClick={() => history.push(window.location.pathname + '/res/' + threadInfo.id)}> To thread
    <div>{opPost?.text}</div>

    </span>

            {media ? media.map((img, index) =>
                    <ImageComponent key={index} src={process.env.REACT_APP_API_URL + img}/>
                )

                :
                null
            }

            {posts?.rows?.map((post, index)=>
                <ThreadPosts post={post} key={index}/>
            )
            }


        </div>
    );
};

export default ThreadPreview;