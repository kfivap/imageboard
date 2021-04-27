import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteThread, pinThread} from "../../http/ThreadAPI";



const ThreadButtonsAdmin = observer(({threadId, bump}) => {
    const {user} =useContext(Context)

    const [pinned, setPinned] = useState((new Date(bump)).getTime() > Date.now())
    const [deleted, setDeleted] = useState(false)

    useEffect(()=>{
            setPinned( (new Date(bump)).getTime() > Date.now() )
    }, [bump])

    const deleteClickHandler = async ()=>{
        await deleteThread(threadId)
        setDeleted(true)
    }

    const pinClickHandler = async ()=>{
        await pinThread(threadId)
       setPinned(prevState => !prevState)

    }

// console.log(pinned)
    if(user?.userRole ==='ADMIN' || user?.userRole ==='MODERATOR'){
        return (
            <span>
                <button className={'removeButton'}
                        onClick={deleteClickHandler}
                >{deleted? 'Thread Removed': "Remove Thread"}</button>
                <button className={'pinButton'}
                        onClick={pinClickHandler}
                >{pinned? 'Unpin':'Pin Thread'}</button>
            </span>
        )} else {
        return null
    }
});

export default ThreadButtonsAdmin;