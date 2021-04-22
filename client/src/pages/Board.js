import React, { useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getThread} from "../http/ThreadAPI";
import ThreadPreview from "../components/ThreadPreview";
import CreateThread from "../components/CreateThread";
import {NOTFOUND_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import {getBoardInfo} from "../http/boardsAPI";



const Board = observer(() => {

    // console.log(window.location.pathname)

    const [threads, setThreads] = useState()
    const [info, setInfo] = useState()
    const history = useHistory()



    useEffect(() => {
        async function fetchData() {
            try {
let address = window.location.pathname.slice(1)
                if(address.endsWith('/')){
                    address = address.slice(0,-1)
                }
                const data = await getThread(address)
                const threadInfo = await getBoardInfo(address)
                setInfo(threadInfo)
                setThreads(data.threads.rows)
            } catch (e) {
                console.log(e.message)
                if(e.message === 'Request failed with status code 404'){
                    history.push(NOTFOUND_ROUTE)
                }

            }

        }
        fetchData()

    }, [])
    // console.log(info)
    return (
        <div>
            <CreateThread/>
            Board {window.location.pathname}
            <br/>
            <div>{info?.name} - / {info?.shortName}/
                <br/>
                {info?.description}
            </div>
            {
                threads?.map((thread, index) =>
                    <ThreadPreview threadInfo={thread} key={index}/>
                )
            }
        </div>
    );
})

export default Board;