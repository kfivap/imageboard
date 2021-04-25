import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteThread} from "../../http/ThreadAPI";


const ThreadButtonsAdmin = observer(({threadId}) => {
    const {user} =useContext(Context)
    // console.log(threadId)

    const deleteClickHandler = async ()=>{
        await deleteThread(threadId)
    }

    if(user?.userRole ==='ADMIN' || user?.userRole ==='MODERATOR'){
        return (
            <span>
            <button className={'removeButton'}
                    onClick={deleteClickHandler}
            >Remove Thread</button>
        </span>
        )} else {
        return null
    }
});

export default ThreadButtonsAdmin;