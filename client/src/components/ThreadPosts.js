import React, {useContext} from 'react';
import Card from "react-bootstrap/Card";
import {parseDate} from "../functions/parseDate";
import ImageComponent from "./ImageComponent";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const ThreadPosts = observer(({post, index}) => {
    // console.log(JSON.parse(post.media))
    // console.log(process.env.REACT_APP_API_URL)
    const {board} =useContext(Context)
 const CreatePostHandler = (id) =>{

        board.setShowCreatePost(true)
     if(board.createPostText === ''){
         console.log(1)
         board.setCreatePostText(board.createPostText + '>>'+id + '\n')

     }  else {
         console.log(3)
         board.setCreatePostText(board.createPostText + '\n>>'+id)

     }



 }

    return (
        <div>
            <Card.Header>{post.author} / {parseDate(post.createdAt)}
                &nbsp;
                &nbsp;
                &nbsp;
               <span className={"appLink"}
               onClick={()=>CreatePostHandler(post.id)}
               >№{post.id}</span>
                &nbsp;
                &nbsp;
                &nbsp;
                <span className={'postIndex'}>#{index}</span>
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
})

export default ThreadPosts;