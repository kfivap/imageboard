import React, { useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import UploadImagesPreview from "./UploadImagesPreview";
import {observer} from "mobx-react-lite";

import {createThreadAPI} from "../http/ThreadAPI";

const CreateThread = observer(() => {
    const [show, setShow] = useState(false)
    const [update, setUpate] = useState(false)

    const toggleHandler = () => {
        setShow(prevState => !prevState)
    }

    const [options, setOptions] = useState('')
    const [text, setText] = useState('')
    const [fileArray, setFileArray] = useState([])

    const loadFile = function (event) {
        if (event.target.files.length + fileArray.length < 5) {
            fileArray.push(...event.target.files)
            setFileArray(fileArray)
            setUpate(prevState => !prevState)
        }

    }
    const createThread = () => {
        const formData = new FormData()

        formData.append('board', window.location.pathname.slice(1))
        formData.append('options', options)
        formData.append('text', text)

        fileArray.forEach((file, index)=>{
            formData.append('media'+index, file)
        })




        createThreadAPI(formData).then(() => { window.location.reload()
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
                                as="textarea" rows={3}
                                placeholder="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.File
                                required multiple
                                id="exampleFormControlFile1"
                                label="Example file input"
                                accept=".jpg,.png"
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
                                        setUpate(prevState => !prevState)
                                        console.log(fileArray)
                                    }}
                            >X</button>
                        <UploadImagesPreview file={file}/>
                        </span>
                    )}

                </>
                :

                <button onClick={toggleHandler} className={'orange bold buttonNone'}>Create Thread</button>
            }


        </div>
    );
})

export default CreateThread;