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
        <div className={'threadImageFullDiv'}
             style={{maxWidth: 'max-content', maxHeight: 'max-content'}}
             onMouseOver={()=>{disableScrolling()}}
             onMouseLeave={()=>{enableScrolling()}}

             onWheel={(e) => onWheelHandler(e)}
        >
        <img src={board.expandedMedia}
             className={'threadImageFull'}
             alt={' '}
             style={{maxWidth: size + 'vw', maxHeight: size+'vh'}}
             onClick={() => {
                 board.setExpandedMedia('')
             }}

        />
            <div>
                    <a
                        href={board.expandedMedia}
                        target={'_blank'}
                    >
                        Original
                    </a>

            </div>
        </div>
    );
})

export default ImageExpanded;