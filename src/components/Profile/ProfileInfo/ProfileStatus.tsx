import React, {ChangeEvent} from "react";


type ProfileStatusType = {
    status:string
    updateUserStatus:(status:string)=>void
}


class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status

    }

    componentDidUpdate(prevProps: ProfileStatusType, prevState: ProfileStatusType) {
        debugger
        console.log('componentDidUpdate')

        if (prevProps.status !== this.props.status ) {
            this.setState({
                status: this.props.status
            })
        }
    }


    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }
    changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({status:e.currentTarget.value})
    }


    render() {
        console.log('this.props.status: ',this.props.status)
        console.log('this.state.status: ',this.state.status)
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '--------'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input value={this.state.status} onChange={this.changeStatusHandler} onBlur={this.deactivateEditMode} autoFocus/>
                </div>
                }
            </div>
        )
    }
}


export default ProfileStatus