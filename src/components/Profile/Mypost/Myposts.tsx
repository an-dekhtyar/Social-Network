import s from "./Myposts.module.css"
import l from "./../../Login/Login.module.css"
import React, {ChangeEvent} from "react";
import {Post} from "./Post/Post";
import {mapDispatchPropsType, mapStatePropsType} from "./MypostContain";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {MaxValueCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../../common/formControl/FormControl";
import createPostIcon from '../../../assets/images/createPost.png'

type MypostPropsType = mapStatePropsType & mapDispatchPropsType
type PostFormType = {
    postText: string
}
const icon = {
    backgroundImage: `url(${createPostIcon})`
}
const Myposts = (props: MypostPropsType) => {
    const deletePostHandler = (id:number) => {
        props.deletePost(id)
    }

    let postElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                  likesAmount={p.likesAmount} userPhoto={props.userPhoto}
                                                  isAuth={props.isAuth} userName={props.userName} deletePost={deletePostHandler}/>);

    const onSubmit = (post: PostFormType) => {
        if (post.postText) {
            props.addPost(post.postText);
        }
    };


    return <div className={s.postsBlock}>
        <div className={s.addNewPostContainer}>
            <div className={s.title}>
                <div className={s.icon} style={icon}/>
                <span>Create posts</span>
            </div>
            <PostReduxForm onSubmit={onSubmit}/>
        </div>
        <div className={s.posts}>
            {postElements}
        </div>
    </div>;
};

const maxValueCreator150 = MaxValueCreator(150)

const PostForm: React.FC<InjectedFormProps<PostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.addPostButton}>
                <button className={`${l.loginButton} ${s.button}`}>Add</button>
            </div>
            <div className={s.myPostTextArea}>
                <Field name='postText' component={TextArea}
                       validate={[maxValueCreator150]}
                />
            </div>
        </form>
    )
}
const PostReduxForm = reduxForm<PostFormType>({
    form: 'post'
})(PostForm)

export default Myposts