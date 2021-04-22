import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import UploadImagesPreview from "./UploadImagesPreview";
import {observer} from "mobx-react-lite";

import {createPost} from "../http/PostAPI";
import {Context} from "../index";

const CreatePost = observer(({showBoolean}) => {
    const [show, setShow] = useState(showBoolean || false)
    const [update, setUpdate] = useState(false)
    const {board} =useContext(Context)
    const toggleHandler = () => {
        setShow(prevState => !prevState)
        board.setShowCreatePost(false)
    }

    const [options, setOptions] = useState('')
    const [text, setText] = useState('')
    const [fileArray, setFileArray] = useState([])

    const loadFile = function (event) {
        if (event.target.files.length + fileArray.length < 5) {
            fileArray.push(...event.target.files)
            setFileArray(fileArray)
            setUpdate(prevState => !prevState)
        }

    }
    const createThread = () => {
        const formData = new FormData()

        formData.append('threadId', window.location.pathname.split('/')[3])
        formData.append('options', options)
        formData.append('text', board.createPostText)


        formData.append('media0', fileArray[0])
        formData.append('media1', fileArray[1])
        formData.append('media2', fileArray[2])
        formData.append('media3', fileArray[3])

        createPost(formData).then(() => {
            board.setShowCreatePost(false)
            board.fetchPostList(window.location.pathname.split('/')[3])
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
                            <Form.File
                                required multiple
                                id="exampleFormControlFile1"
                                label="Example file input"
                                accept=".jpg,.png"
                                // onChange={selectFiles}
                                onChange={loadFile}
                            />
                        </Form.Group>

                        <Button
                            variant="outline-success"
                            onClick={createThread}
                        >Create</Button>





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