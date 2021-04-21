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