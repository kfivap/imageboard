import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {boardTotal} from "../http/boardsAPI";

const BoardStatistic = observer(() => {

    const [stat, setStat]=useState()

    useEffect(()=>{
        async function fetchData() {
            const data = await boardTotal()
// console.log(data)
            setStat(data)
        }
fetchData()
        let interval = setInterval(fetchData, 30000)

        return(()=>clearInterval(interval))
    }, [])

    // console.log(stat)
    return (
        <div>
<br/>
            For all the time
            <br/>
            <b>{stat?.boardCount}</b> boards
            <br/>
            <b>{stat?.threadCount}</b> threads
            <br/>
            <b>{stat?.postCount}</b> posts

            were created

        </div>
    );
})

export default BoardStatistic;