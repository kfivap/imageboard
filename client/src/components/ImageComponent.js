import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const scaleChange = 12

const ImageComponent = observer(({src}) => {
const {board} = useContext(Context)
    const [expanded, setExpanded] = useState(false)
    const [size, setSize] = useState(80)


    const onWheelHandler = (e) => {

        if (e.deltaY > 0) {
            console.log(size)
            if(size-scaleChange<40){
                return;
            }
            setSize(prevState => prevState - scaleChange)
            return
        }
        if (e.deltaY < 0) {
            console.log(size)
            if(size+scaleChange>125){
                return;
            }
            setSize(prevState => prevState + scaleChange)
            return
        }
    }

    useEffect(()=>{
     return (()=>{
         setExpanded(false)
         setSize(80)
     })
    }, [])


//     function listenerrr(){
//         console.log(true)
//     }
//
// useEffect(()=>{
//     if(expanded) {
//         window.addEventListener('click', listenerrr)
//     }
//     if(!expanded){
//         return ( window.removeEventListener('click', listenerrr))
//     }
//
//     // return ( window.removeEventListener('click', listenerrr))
//
// } )
//     useEffect(()=>{
//
//     })


    return (
        <span>
            <img src={src}
                 className={'threadImagePreview'}
                 onClick={() => {
                     setExpanded(true)
                     board.setExpandedMedia(src)
                 }}
            />

            {expanded ?
                <img src={src}
                     className={'threadImageFull'}
                     style={{maxWidth: size + 'vw', maxHeight: size + 'vh'}}
                     onClick={() => {

                         setExpanded(false)
                         // setSize(80)
                         board.setExpandedMedia('')
                     }}
                     onWheel={(e) => onWheelHandler(e)}
                />
                :
                null
            }
</span>
    );
})

export default ImageComponent;