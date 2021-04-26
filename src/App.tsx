import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {DialogsContain} from "./components/Dialogs/DialogsContain";
import UsersContain from "./components/Users/UsersContain";
import Login from "./components/Login/Login";


const App = () => {

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={ () => <DialogsContain/>}/>
                <Route path='/profile/:userId?' render={ () => <ProfileContainer/>}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/users' render={() => <UsersContain/>}/>
                <Route path='/settings' render={()=> <Settings/>}/>
                <Route path='/login' render={() => <Login/>}/>

            </div>
        </div>
    )
}


export default App;
