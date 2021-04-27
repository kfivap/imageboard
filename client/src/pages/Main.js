import React from 'react';

import {observer} from "mobx-react-lite";

import BoardsList from "../components/BoardsList";
import BoardStatistic from "../components/BoardStatistic";


const Main = observer(() => {


    return (
        <div>
            Main
<BoardsList/>
<BoardStatistic/>
        </div>
    );
})

export default Main;