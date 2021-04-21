import React from 'react';

import {observer} from "mobx-react-lite";

import BoardsList from "../components/BoardsList";


const Main = observer(() => {


    return (
        <div>
            Main
<BoardsList/>
        </div>
    );
})

export default Main;