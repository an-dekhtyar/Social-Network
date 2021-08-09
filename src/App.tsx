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
import { ErrorWindow } from './common/ErrorWindow/ErrorWindow';
import { Transition } from 'react-transition-group';


type AppPropsType = mapDispatchPropsType & mapStateToPropsType
type mapDispatchPropsType = {
    initializeAppTC: () => void
}

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return (
                <div className={'app-preloader'}>
                    <Preloader/>
                </div>)
        }
        return (
            <div className='app'>

                <Transition
                    in={!!this.props.error}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                >
                    {state => <div className={`errorWindow ${state}`}>
                        <ErrorWindow error={this.props.error} />
                    </div>}
                </Transition>
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
            </div>
        )
    }
}

type mapStateToPropsType = {
    initialized: boolean
    error:string
}
const mapStateToProps = (state: AppStateType) => ({
        initialized: state.app.initialized,
        error:state.app.error
    }
)

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeAppTC}))(App);

const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>

}

export default SamuraiJSApp