import React, {useContext, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createBoardAPI} from "../http/boardsAPI";
import {Context} from "../index";

const Admin = () => {

    // const {name, shortName, description}
    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [description, setDescription] = useState('')

    const {user} = useContext(Context)
    console.log(user.userRole)

    const createBoard = async () => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('shortName', shortName)
        formData.append('description', description)
        try {
          await  createBoardAPI(formData)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }


    }

if(user.userRole ==='ADMIN'){
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
    )} else {
    return (
        <div>Forbidden / Unathorized
            <br/>
        Please log in or leave this page
        </div>
    )
}
};

export default Admin;