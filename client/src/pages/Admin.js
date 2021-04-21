import React, {useState} from 'react';
import {createThreadAPI} from "../http/ThreadAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createBoardAPI} from "../http/boardsAPI";

const Admin = () => {

    // const {name, shortName, description}
    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [description, setDescription] = useState('')

    const createBoard = () => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('shortName', shortName)
        formData.append('description', description)

        createBoardAPI(formData).then(() => { window.location.reload()
        })
    }

    return (
        <div>
            <Form>
                <Form.Label>Create board</Form.Label>
                <Form.Group controlId="formOptions">
                    <Form.Control
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formOptions">
                    <Form.Control
                        placeholder="shortName"
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formText">
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>



                <Button
                    variant="outline-success"
                    onClick={createBoard}
                >Create</Button>





            </Form>
        </div>
    );
};

export default Admin;