import s from "./Navbar.module.css";
import React from "react";
import {FriendsType} from "../../redux/state";


type FriendsPropsType = {
    friends:Array<FriendsType>
}



const Friends:React.FC<FriendsPropsType> = (props) => {

   let friendsElement = props.friends.map(f => <Friend key={f.id} id={f.id} name={f.name} urlImage={f.urlImage}/> )

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
