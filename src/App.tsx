import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {ActionsTypes, RootStateType} from "./redux/state";

type AppPropsType ={
    state:RootStateType
    dispatch:(action:ActionsTypes)=>void

}

const App:React.FC<AppPropsType> = (props) => {


    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar sideBarState={props.state.sideBarState}/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ () => <Dialogs
                        dialogsPageState={props.state.dialogsPageState}
                        newOutMessageText={props.state.dialogsPageState.newOutMessageText}
                        dispatch = {props.dispatch}

                    />}/>
                    <Route path='/profile' render={ () => <Profile
                        profilePageState={props.state.profilePageState}
                        newTextPostValue={props.state.profilePageState.newTextPostValue}
                        dispatch = {props.dispatch}
                    />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={ ()=> <Settings/>}/>

                </div>
            </div>
    )
}


export default App;
