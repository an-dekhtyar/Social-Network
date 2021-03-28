import s from "./Navbar.module.css";
import React from "react";
import { mapStatePropsType } from "./FriendsContain";
import { FriendsType } from "../../redux/navbarReducer";


type FriendsPropsType = mapStatePropsType



export const Friends:React.FC<FriendsPropsType> = (props) => {

    let friendsElement = props.sideBarState.friends.map(f => <Friend key={f.id} id={f.id} name={f.name} urlImage={f.urlImage}/> )

    return (
        <div>
            <div className={s.friendsItem}>
                Friends
            </div>
            <div>
                {friendsElement}
            </div>

        </div>)
}

const Friend:React.FC<FriendsType> = (props) => {
    return (
        <div className={s.friendsBlock}>
            <div className={s.imgFriendsBlock}>
                <img src={props.urlImage}/>
            </div>
            <div className={s.nameFriendsBlock}>
                {props.name}
            </div>
        </div>
    )
}


export default Friends

