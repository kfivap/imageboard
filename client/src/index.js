import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserStore from "./store/UserStore";

import './index.css'

import BoardStore from "./store/BoardStore";


export const Context = createContext(null)



ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        board: new BoardStore()
    }}>

    <App />



    </Context.Provider>
        ,
  document.getElementById('root')
);
