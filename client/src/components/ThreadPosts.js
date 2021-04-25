import React, {useContext} from 'react';

import {parseDate} from "../functions/parseDate";
import ImageComponent from "./ImageComponent";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ReactHtmlParser from 'react-html-parser'
import PostButtonsAdmin from "./Admin/PostButtonsAdmin";
import ReplyPreview from "./modals/ReplyPreview";



const ThreadPosts = observer(({post, index}) => {

    const {board} = useContext(Context)

    const CreatePostHandler = (id) => {
        // console.log(post.threadId)
        board.setCreatePostThreadId(post.threadId)
        board.setShowCreatePost(true)
        if (board.createPostText === '') {
            // console.log(1)
            board.setCreatePostText(board.createPostText + '>>' + id + '\n')

        } else {
            // console.log(3)
            board.setCreatePostText(board.createPostText + '\n>>' + id)

        }


    }


    let tempText = post.text
    const re = />>[0-9]+/
    let tempArray = []

    // let dangerCount = 500
    while (true) {
        if (tempText.match(re)) {
            let len = tempText.match(re)[0].length
            let ind = tempText.match(re).index
            tempArray.push(tempText.slice(0, len + ind))

            tempText = tempText.slice(len + ind)
        }

        if (!tempText.match(re)) {
            tempArray.push(tempText)
            break
        }
    }

    // let arrayWithHrefs = tempArray.map(element => {
    //     let answer = element.match(re) ? element.match(re)[0] : null
    //     element = element.replace(re, `<a  href="#${answer?.slice(2)}">${answer}</a>`)
    //
    //     return (element)
    // })

    let arrayWithHrefs = tempArray.map(element => {
        let answer = element.match(re) ? element.match(re)[0] : null
        element = element.replace(re, `${answer}`)

        return (element)
    })

    post.text = arrayWithHrefs.length === 0 ? post.text : arrayWithHrefs.join('')
    const lineBreak = post.text.split('\n')
    // console.log(lineBreak)

    // console.log(index)

    return (
        <div className={index===0? 'postFull' : 'postFull notOPsPosts'}
        style={index===0? {
            width: 100+'%'
        }
        :
         null
        }
        >


            <a id={post?.id}> </a>
            <div className={'postHeader'}>{post?.author} / {parseDate(post?.createdAt)}
                &nbsp;
                &nbsp;
                &nbsp;
                <span className={"appLink"}
                      onClick={() => CreatePostHandler(post?.id)}
                >№{post?.id}</span>
                &nbsp;
                &nbsp;
                &nbsp;
                <span className={'postIndex'}>#{index}</span>
                &nbsp;
                <PostButtonsAdmin postId={post?.id}/>
            </div>
            <span>


                         {post?.media ? JSON.parse(post.media).map((img, index) => {
                                 if (img === null) {
                                     return null
                                 }
                                 return (
                                     <ImageComponent key={index} src={process.env.REACT_APP_API_URL + img}/>

                                 )
                             }
                             )

                             :
                             null
                         }
            </span>
            <div className={'postText'}>{
                lineBreak.map((e, i) =>{
                    // console.log(e)
                    return <ReplyPreview key={i}
                                         element={e}
                                         className={'postTextSpan'}
                    />})
            }
            </div>
            {/*<Card.Body>{ReactHtmlParser(post?.text)}</Card.Body>*/}
            {/*<Card.Body>{tempArray.length===0 ? post.text : tempArray.map((element, key)=>*/}
            {/*    <TestComponent key={key} element={element}/>*/}
            {/*)}</Card.Body>*/}
            {/*maybe use it in future but not now*/}


        </div>
    );
})

export default ThreadPosts;