import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store, {RootStateType} from './redux/state';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";


let rerenderEntireTree = ()=>{
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App
                    state={store.getState()}
                    dispatch={store.dispatch.bind(store)}

                />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


rerenderEntireTree();
store.subscriber(rerenderEntireTree)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

