import React from 'react';
import './App.css';
import {HeaderContain} from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContain from "./components/Dialogs/DialogsContain";
import UsersContain from "./components/Users/UsersContain";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeAppTC} from "./redux/appReducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./common/Preloader";
import {NotFound} from "./components/NotFound404/NotFound404";


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
                <HeaderContain/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                    <Route path={'/'} exact render={() => <Redirect to={'/profile'}/>}/>
                    <Route path='/dialogs' render={() => <DialogsContain/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/users' render={() => <UsersContain/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/404' render={() => <NotFound/>}/>
                    <Redirect from='*' to={'/404'}/>
                    </Switch>
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

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStatetoProps, {initializeAppTC}))(App);

const SamuraiJSApp = (props:any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>

}

export default SamuraiJSApp