import React from 'react';
import Card from "react-bootstrap/Card";
import {parseDate} from "../functions/parseDate";
import ImageComponent from "./ImageComponent";

const ThreadPosts = ({post, index}) => {
    // console.log(JSON.parse(post.media))
    // console.log(process.env.REACT_APP_API_URL)
    return (
        <div>
            <Card.Header>{post.author} / {parseDate(post.createdAt)}
                &nbsp;
                &nbsp;
                &nbsp;
                №{post.id}
                &nbsp;
                &nbsp;
                #{index}
            </Card.Header>
            <Card.Body>{post.text}</Card.Body>
            <span>
                         {post.media ? JSON.parse(post.media).map((img, index) =>
                             {if(img===null){
                                 return null
                             }
                                 return(
                                     <ImageComponent  key={index} src={process.env.REACT_APP_API_URL + img}/>

                                 )
                             }

                             )

                             :
                             null
                         }
            </span>

        </div>
    );
};

export default ThreadPosts;