import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getThread} from "../http/ThreadAPI";
import ThreadPreview from "../components/ThreadPreview";
import CreateThread from "../components/CreateThread";

const Board = observer(() => {

    // console.log(window.location.pathname)

    const [threads, setThreads] = useState()

    useEffect(() => {
        async function fetchData() {

            const data = await getThread(window.location.pathname.slice(1))

            setThreads(data.threads.rows)
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