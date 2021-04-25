import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ReplyPreviewModal from "./ReplyPreviewModal";


const ReplyPreview = observer(({element}) => {
    const re = />>[0-9]+/
    let ind = element?.indexOf('>>')
    // const number = element?.slice(ind)
    // const numberOnlyDigits = element?.slice(ind)
    // const text = element?.slice(0, ind)

    const [textBefore, setTextBefore] = useState('')
    const [reply, setReply] = useState('')
    const [textAfter, setTextAfter] = useState('')
    const [count, setCount] = useState(0)

    useEffect(()=> {
        if (element.match(re)) {
            // console.log(element.match(re))
            // console.log(element.match(re)[0])
            // console.log(element.match(re)[0].length)
            const matched = element.match(re)
            const len = element.match(re)[0].length
            // console.log('text before: ', element.slice(0, element.match(re).index))
            setTextBefore(element.slice(0, matched.index))
            setTextAfter(element.slice(matched.index + len))
            setReply(matched[0])

            // console.log('text after: ', element.slice(element.match(re).index + len))
        }
        if(!element.match(re)){
            setTextBefore(element)
            // console.log(count)

        }
    }, [re, element])
// if(reply===''){
//     return
// }

    return (
        <>

            {textBefore}
            {reply===''? null :
                <ReplyPreviewModal
                    reply={reply}
                />
            }

        {textAfter}
<br/>

        </>
    );
})

export default ReplyPreview;