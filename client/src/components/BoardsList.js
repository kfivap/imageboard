import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getBoards} from "../http/boardsAPI";
import {useHistory} from 'react-router-dom'

const BoardsList = observer(() => {

    const [boards, setBoards] = useState(null)
    const history = useHistory()

    useEffect(()=>{

        async function fetchData() {
            let data = await getBoards()
            setBoards(data)
        }
        fetchData()

    }, [])
    console.log(boards)
    return (
        <div>
            Board List
            <br/>
            <br/>
            {boards?.map((board,index) =>
                <div onClick={()=>history.push(board.shortName)}
                     className={'appLink orange'}
                     key={index}>
                    /{board.shortName}/ {board.name}
                </div>
            )}
        </div>
    );
})

export default BoardsList;