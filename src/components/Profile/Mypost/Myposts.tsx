import s from "./Myposts.module.css"
import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import {mapDispatchPropsType, mapStatePropsType} from "./MypostContain";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {MaxValueCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../../common/formControl/FormControl";

type MypostPropsType = mapStatePropsType & mapDispatchPropsType
type PostFormType = {
    postText:string
}

const Myposts:  React.FC<MypostPropsType> = (props) => {

    let postElements = props.profilePageState.posts.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                                   likesAmount={p.likesAmount} urlImage={p.urlImage}/>)


    const onSubmit = (post:PostFormType) => {
        if (post.postText) {
            props.addPost(post.postText)
        }
        console.log(post)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>)
}

const maxValueCreator10 = MaxValueCreator(10)

const PostForm: React.FC<InjectedFormProps<PostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name='postText' component={TextArea}
                    validate={[required, maxValueCreator10]}
                    />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>
    )
}
const PostReduxForm = reduxForm<PostFormType>({
    form: 'post'
})(PostForm)

export default Myposts