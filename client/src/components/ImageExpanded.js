import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
const scaleChange = 12
const ImageExpanded = observer(() => {

    const {board} = useContext(Context)
    const [size, setSize] = useState(80)

    const onWheelHandler = (e) => {
        if (e.deltaY > 0) {
            if(size-scaleChange<40){
                return;
            }
            setSize(prevState => prevState - scaleChange)
            return
        }
        if (e.deltaY < 0) {
            if(size+scaleChange>180){
                return;
            }
            setSize(prevState => prevState + scaleChange)
            return
        }
    }

    function disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }
    function enableScrolling(){
        window.onscroll=function(){};
    }



    if(board.expandedMedia===''){
        enableScrolling()
        return null
    }

    return (
        <img src={board.expandedMedia}
             className={'threadImageFull'}
             style={{maxWidth: size + 'vw', maxHeight: size+'vh'}}
             onMouseOver={()=>{disableScrolling()}}
             onMouseLeave={()=>{enableScrolling()}}
             onClick={() => {
                 board.setExpandedMedia('')
             }}
             onWheel={(e) => onWheelHandler(e)}
        />
    );
})

export default ImageExpanded;