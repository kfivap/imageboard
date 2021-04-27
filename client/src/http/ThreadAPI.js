import {$authHost, $host} from "./index";

export const getThread = async (board) =>{

    const {data} = await $host.get
    (`api/thread/get?board=${board}`)

    return data
}
export const createThreadAPI = async (formData) =>{

    const {data} = await $host.post(`api/thread/create`, formData)


    return data
}
export const deleteThread = async (thread) =>{

    const {data} = await $authHost.delete
    (`api/thread/delete?threadId=${thread}`)
    return data
}

export const pinThread = async (threadId) =>{

    const {data} = await $authHost.put
    (`api/thread/pin`, {threadId})
    return data
}

export const getOneThread = async (thread) =>{

    const {data} = await $authHost.get
    (`api/thread/getOne?threadId=${thread}`)
    return data
}