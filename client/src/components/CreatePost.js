import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import UploadImagesPreview from "./UploadImagesPreview";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import {createPost} from "../http/PostAPI";
import {Context} from "../index";

const CreatePost = observer(({showBoolean, fromBottom}) => {
    const [show, setShow] = useState(showBoolean || false)
    const [update, setUpdate] = useState(false)
    const {board} = useContext(Context)
    const history = useHistory()
    const toggleHandler = () => {
        setShow(prevState => !prevState)
        board.setShowCreatePost(false)
        setTimeout(()=>window.scroll(0,1000000000000), 0)
    }

    const [options, setOptions] = useState('')
    const [fileArray, setFileArray] = useState([])

    const loadFile = function (event) {
        if (event.target.files.length + fileArray.length < 5) {
            fileArray.push(...event.target.files)
            setFileArray(fileArray)
            setUpdate(prevState => !prevState)
        }

    }
    // update
    const createThreadPost = () => {
        const formData = new FormData()

        formData.append('threadId', window.location.pathname.split('/')[3] || board.createPostThreadId)
        formData.append('options', options)
        formData.append('text', board.createPostText)


        formData.append('media0', fileArray[0])
        formData.append('media1', fileArray[1])
        formData.append('media2', fileArray[2])
        formData.append('media3', fileArray[3])
        // console.log(window.location.pathname.split('/').length<4)


        console.log(board.createPostThreadId)
        createPost(formData).then(() => {
            board.setShowCreatePost(false)
            if(window.location.pathname.split('/').length<4){
                if(window.location.pathname.endsWith('/')){
                    history.push(window.location.pathname+'res/'+board.createPostThreadId || window.location.pathname.split('/')[3])
                } else {
                    history.push(window.location.pathname+'/res/'+board.createPostThreadId || window.location.pathname.split('/')[3])
                }

            }
            board.fetchPostList(window.location.pathname.split('/')[3]).then(()=>window.scroll(0, 1000000000))
            board.setCreatePostText('')

        })
    }


    return (
        <div>
            {show ?
                <>
                    <button onClick={toggleHandler} className={'orange bold buttonNone mb-2'}>Close posting form
                    </button>
                    <Form>
                        <Form.Group controlId="formOptions">
                            <Form.Control
                                placeholder="options"
                                value={options}
                                onChange={(e) => setOptions(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formText">
                            <Form.Control
                                as="textarea" rows={12}
                                placeholder="text"
                                value={board.createPostText}
                                onChange={(e) => board.setCreatePostText(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Upload Files
                        </label>
                        <input
                            required multiple
                            accept=".jpg,.png"
                            type="file"
                            name="file"
                            onChange={loadFile}
                            id="file-upload"
                            className={'inputHide'}

                        />
                        <button
                            className={'createButton'}
                            onClick={createThreadPost}
                        >Create</button>
                        </Form.Group>

                    </Form>
                    {fileArray.map((file, index) =>
                        <span key={index} className={'uploadSpan'}>
                            <button className={'buttonNone removeUploadBtn'}
                                    onClick={() => {
                                        fileArray.splice(index, 1)
                                        setUpdate(prevState => !prevState)
                                    }}
                            >X</button>
                        <UploadImagesPreview file={file}/>
                        </span>
                    )}

                </>
                :

                <button onClick={toggleHandler} className={'orange bold buttonNone'}>Post here</button>

            }



        </div>
    );
})

export default CreatePost;