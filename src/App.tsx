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
import DialogsContain from "./components/Dialogs/DialogsContain";
import UsersContain from "./components/Users/UsersContain";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {authMe} from "./redux/auth-reducer";
import {ProfilePageType} from "./redux/profileReducer";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeAppTC} from "./redux/appReducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./common/Preloader";


type AppPropsType = mapDispatchPropsType & mapStatetoPropsTyep
type mapDispatchPropsType = {
    initializeAppTC:()=>void
}

class App extends React.Component<AppPropsType> {

    componentDidMount(){
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContain/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/users' render={() => <UsersContain/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <Login/>}/>

                </div>
            </div>
        )
    }
}
type mapStatetoPropsTyep = {
    initialized: boolean
}
const mapStatetoProps = (state:AppStateType) => (
    {initialized:state.app.initialized}
)

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStatetoProps, {initializeAppTC}))(App);
