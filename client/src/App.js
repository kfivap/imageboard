import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import ImageExpanded from "./components/ImageExpanded";
import ModalCreatePost from "./components/ModalCreatePost";
import {toJS} from "mobx";


const App = observer(() => {

    const {user}=useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            check().then(data=>{
                // user.setUser(true)
                user.setIsAuth(true)
                // console.log(data)
                user.setUserId(data.userId)
                user.setUserRole(data.userRole)
            }).finally(()=> setLoading(false))

            }, 0)

    }, [])

    if(loading){
        return <Spinner animation={'grow'}/>
    }

    return (

        <BrowserRouter >
            <NavBar/>
            <Container style={{maxWidth: 760}}>
                <AppRouter/></Container>
            <ImageExpanded/>
            <ModalCreatePost/>

        </BrowserRouter>

    );
})

export default App;
