import React, {useEffect, useState} from 'react';
import {parseDate} from "../functions/parseDate";
import {useHistory} from "react-router-dom";
import {getPreview} from "../http/PostAPI";
import ImageComponent from "./ImageComponent";

const ThreadPreview = ({threadInfo}) => {

    const [posts, setPosts] = useState()
    const [media, setMedia] = useState()

    useEffect(() => {
        async function fetchData() {

            const data = await getPreview(threadInfo.id)


            setPosts(data.posts)
            setMedia(JSON.parse(data.posts?.media))

        }

        fetchData()


    }, [])
    // console.log(process.env.REACT_APP_API_URL + JSON.parse(media))
// console.log(media)
    const history = useHistory()
    return (
        <div>
            <br/>

            {parseDate(threadInfo.createdAt)}
            <span onClick={() => history.push(window.location.pathname + '/res/' + threadInfo.id)}> To thread
    <div>{posts?.text}</div>

    </span>

            {media ? media.map((img, index) =>
                    <ImageComponent key={index} src={process.env.REACT_APP_API_URL + img}/>
                )

                :
                null
            }

        </div>
    );
};

export default ThreadPreview;