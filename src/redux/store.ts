import {DialogPageReducerType, dialogReducer} from "./dialogReducer";
import {ProfilePageReducerType,profileReducer} from "./profileReducer";
import {sidebarReducer} from "./navbarReducer";

export type newTextPostValueType = string
export type PostType = {
    id: number
    message: string
    likesAmount: number
    urlImage: string
}
export type DialogItemType = {
    id: number
    name: string
    urlImage: string
}
export type MessageType = {
    id: number
    message: string
}
export type FriendsType = {
    id: number
    name: string
    urlImage: string

}
export type SideBarType = {
    friends: Array<FriendsType>
}
export type ProfilePageType = {
    posts: Array<PostType>
    newTextPostValue: string
}
export type DialogPageType = {
    dialogs: Array<DialogItemType>
    inMessages: Array<MessageType>
    outMessages: Array<MessageType>
    newOutMessageText: string
}
export type RootStateType = {
    profilePageState: ProfilePageType
    dialogsPageState: DialogPageType
    sideBarState: SideBarType
}
export type StoreType = {
    _state: RootStateType
    addNewPost: (postMessage: string) => void
    changeValuePost: (newText: string) => void
    addOutMessage: (newOutMessageText: string) => void
    changeValueOutMessage: (newText: string) => void
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = DialogPageReducerType | ProfilePageReducerType




export let store: StoreType = {
    _state: {
        profilePageState: {
            posts: [
                {
                    id: 1,
                    message: "Hi, how are you?",
                    likesAmount: 45,
                    urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
                },
                {
                    id: 2,
                    message: "What is your name?",
                    likesAmount: 24,
                    urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
                },
                {
                    id: 3,
                    message: "What is your favorite TV-show?",
                    likesAmount: 56,
                    urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
                },
            ],
            newTextPostValue: ""

        },
        dialogsPageState: {
            dialogs: [
                {
                    id: 1,
                    name: "Andrey",
                    urlImage: "https://pbs.twimg.com/profile_images/488616487197106177/xIFT8idk.jpeg"
                },
                {
                    id: 2,
                    name: "Sasha",
                    urlImage: "https://i.pinimg.com/originals/d5/28/70/d52870bf3c60d63d304a589f395e6a86.png"
                },
                {
                    id: 3,
                    name: "Sveta",
                    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE1vTzqH-MVVPtDn_aoZ-5Jm_ibot1uqH9VQ&usqp=CAU"
                },
                {
                    id: 4,
                    name: "Nastya",
                    urlImage: "https://i.pinimg.com/originals/fa/53/2d/fa532da807474b076afdfad93565e447.jpg"
                },
                {
                    id: 5,
                    name: "Tanya",
                    urlImage: "https://i.pinimg.com/originals/19/5a/51/195a519a5dff6fb6495d2b1ea7176240.jpg"
                },
                {
                    id: 6,
                    name: "Alex",
                    urlImage: "https://previews.123rf.com/images/sudowoodo/sudowoodo1706/sudowoodo170600033/80907546-green-alien-face-emoji-extraterrestrial-humanoid-head-icon-vector-illustration-.jpg"
                }
            ],
            inMessages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "Where are you from?"},
                {id: 4, message: "Where are you?"},
            ],
            outMessages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you?"},
                {id: 3, message: "Where are you from?"},
                {id: 4, message: "Where are youu?"},
            ],
            newOutMessageText: ""
        },
        sideBarState: {
            friends: [
                {
                    id: 1,
                    name: "Andrey",
                    urlImage: "https://pbs.twimg.com/profile_images/488616487197106177/xIFT8idk.jpeg"
                },
                {
                    id: 2,
                    name: "Sasha",
                    urlImage: "https://i.pinimg.com/originals/d5/28/70/d52870bf3c60d63d304a589f395e6a86.png"
                },
                {
                    id: 3,
                    name: "Sveta",
                    urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE1vTzqH-MVVPtDn_aoZ-5Jm_ibot1uqH9VQ&usqp=CAU"
                },
            ]
        }

    },
    getState() {
        return this._state
    },
    addNewPost(postMessage) {
        let newPost: PostType = {
            id: 4,
            message: postMessage,
            likesAmount: 0,
            urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
        }
        this._state.profilePageState.posts.push(newPost)
        this.changeValuePost('')
        this._callSubscriber()

    },
    changeValuePost(newText) {

        this._state.profilePageState.newTextPostValue = newText
        this._callSubscriber()
    },
    addOutMessage(newOutMessageText) {
        let newMessage: MessageType = {
            id: 4,
            message: newOutMessageText
        }
        this._state.dialogsPageState.outMessages.push(newMessage)
        this.changeValueOutMessage('')
        this._callSubscriber()
    },
    changeValueOutMessage(newText) {

        this._state.dialogsPageState.newOutMessageText = newText
        this._callSubscriber()
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    _callSubscriber() {},
    dispatch(action) {
        this._state.dialogsPageState = dialogReducer(this._state.dialogsPageState, action)
        this._state.profilePageState = profileReducer(this._state.profilePageState, action)
        this._state.sideBarState = sidebarReducer(this._state.sideBarState, action)
        this._callSubscriber()
    }


}


export default store;