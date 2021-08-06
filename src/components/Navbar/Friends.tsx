import s from "./Navbar.module.css";
import React from "react";
import { mapStatePropsType } from "./FriendsContain";
import { FriendsType } from "../../redux/navbarReducer";
import {backgroundImageHelper} from "../Header/Header";


type FriendsPropsType = mapStatePropsType



export const Friends:React.FC<FriendsPropsType> = (props) => {

    let friendsElement = props.sideBarState.friends.map(f => <Friend key={f.id} id={f.id} name={f.name} urlImage={f.urlImage}/> )

    return (
        <div>
            <div className={s.friendsBlock}>
                {friendsElement}
            </div>

        </div>)
}

const Friend:React.FC<FriendsType> = (props) => {
    return (
            <span style={backgroundImageHelper(props.urlImage)} className={s.imgFriend}/>
    )
}
export default Friends

