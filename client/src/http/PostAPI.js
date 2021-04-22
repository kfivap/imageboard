import { $host} from "./index";

export const getPosts = async (thread) =>{

    const {data} = await $host.get
    (`api/post/get?threadId=${thread}`)
    return data
}
export const createPost = async (formData) =>{

    const {data} = await $host.post(`api/post/create`, formData)

    return data
}


export const getPreview = async (thread) =>{

    const {data} = await $host.get
    (`api/post/getPreview?threadId=${thread}`)
    return data
}