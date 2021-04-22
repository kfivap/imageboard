import {$authHost, $host} from "./index";

export const getBoards = async () =>{

    const {data} = await $host.get
    (`api/board/get/`)

    return data
}

export const getBoardInfo = async (board) =>{

    const {data} = await $host.get
    (`api/board/getInfo?board=${board}`)

    return data
}


export const createBoardAPI = async (formData) =>{

    const {data} = await $authHost.post(`api/board/create/`, formData)

    return data
}

