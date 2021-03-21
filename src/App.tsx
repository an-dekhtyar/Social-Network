import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {StoreType} from "./redux/store";
import {DialogsContain} from "./components/Dialogs/DialogsContain";

type AppPropsType ={
    store:StoreType


}

const App:React.FC<AppPropsType> = (props) => {



    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar store={props.store}/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <DialogsContain
                        store={props.store}

                    />}/>
                    <Route path='/profile' render={ () => <Profile
                        store={props.store}

                    />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={ ()=> <Settings/>}/>

                </div>
            </div>
    )
}


export default App;
