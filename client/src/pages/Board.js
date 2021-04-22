import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getThread} from "../http/ThreadAPI";
import ThreadPreview from "../components/ThreadPreview";
import CreateThread from "../components/CreateThread";
import {NOTFOUND_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";


const Board = observer(() => {

    // console.log(window.location.pathname)

    const [threads, setThreads] = useState()
    const history = useHistory()
    // const [threads, setThreads] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
let address = window.location.pathname.slice(1)
                if(address.endsWith('/')){
                    address = address.slice(0,-1)
                }
                const data = await getThread(address)

                setThreads(data.threads.rows)
            } catch (e) {
                console.log(e.message)
                history.push(NOTFOUND_ROUTE)
            }

        }
        fetchData()


    }, [])
    // console.log(threads)
    return (
        <div>
            <CreateThread/>
            Board {window.location.pathname}
            {
                threads?.map((thread, index) =>
                    <ThreadPreview threadInfo={thread} key={index}/>
                )
            }
        </div>
    );
})

export default Board;