import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const scaleChange = 12

const ImageComponent = observer(({src}) => {
    const {board} = useContext(Context)



    useEffect(()=>{
     return (()=>{
         board.setExpandedMedia('')
     })
    }, [])




    return (
        <span>
            <img src={src}
                 className={'threadImagePreview'}
                 onClick={() => {
                     board.setExpandedMedia(src)
                 }}
            />

</span>
    );
})

export default ImageComponent;