import React, {useContext} from 'react';
import Card from "react-bootstrap/Card";
import {parseDate} from "../functions/parseDate";
import ImageComponent from "./ImageComponent";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ReactHtmlParser from 'react-html-parser'

const ThreadPosts = observer(({post, index}) => {
    // console.log(JSON.parse(post.media))
    // console.log(process.env.REACT_APP_API_URL)
    const {board} =useContext(Context)
 const CreatePostHandler = (id) =>{
     console.log(post.threadId)
     board.setCreatePostThreadId(post.threadId)
        board.setShowCreatePost(true)
     if(board.createPostText === ''){
         // console.log(1)
         board.setCreatePostText(board.createPostText + '>>'+id + '\n')

     }  else {
         // console.log(3)
         board.setCreatePostText(board.createPostText + '\n>>'+id)

     }



 }

 // /^>>[0-9]/
 //    console.log(post.text)
    let tempText = post.text
 // console.log(post.text.replace( /^>>[0-9]/, `a href='#${post.text}' link a>`))
    const re = />>[0-9]+/
    let answer = post.text.match(re)? post.text.match(re)[0] : null
    //
    // console.log(post.text.match(re)? post.text.match(re)[0] : null)
    let tempArray = []
    let count = 0
    while(tempText.match(re) && count<5){

        let len =tempText.match(re)[0].length
        let ind = tempText.match(re).index
        tempArray.push(tempText.slice(0,len+ind))
        tempText = tempText.slice(len+ind)
        // console.log(tempText.match(re))
        // console.log(tempText)
        console.log(tempArray)

    }
    let test = tempArray.map(element=>{
        let answer = element.match(re)? element.match(re)[0] : null
    return(element = element.replace(re, `<a href="#${answer?.slice(2)}">${answer}</a>` ))
    })
    console.log(test.join(''))
 // post.text = (post.text.replace( re, `<a href="#${answer?.slice(2)}">${answer}</a>`))
    post.text = test.join('')
    return (
        <div>
            <a id={post?.id}>{post?.id}</a>
            <Card.Header>{post?.author} / {parseDate(post?.createdAt)}
                &nbsp;
                &nbsp;
                &nbsp;
               <span className={"appLink"}
               onClick={()=>CreatePostHandler(post?.id)}
               >№{post?.id}</span>
                &nbsp;
                &nbsp;
                &nbsp;
                <span className={'postIndex'}>#{index}</span>
            </Card.Header>
            <Card.Body>{ ReactHtmlParser(post?.text)}</Card.Body>
            <span>

                         {post?.media ? JSON.parse(post.media).map((img, index) =>
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