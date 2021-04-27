import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import ReplyPreviewModal from "./ReplyPreviewModal";


const ReplyPreview = observer(({element}) => {
    const re = />>[0-9]+/


    const [textBefore, setTextBefore] = useState('')
    const [reply, setReply] = useState('')
    const [textAfter, setTextAfter] = useState('')


    useEffect(()=> {
        if (element.match(re)) {

            const matched = element.match(re)
            const len = element.match(re)[0].length

            setTextBefore(element.slice(0, matched.index))
            setTextAfter(element.slice(matched.index + len))
            setReply(matched[0])


        }
        if(!element.match(re)){
            setTextBefore(element)


        }
    }, [re, element])

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