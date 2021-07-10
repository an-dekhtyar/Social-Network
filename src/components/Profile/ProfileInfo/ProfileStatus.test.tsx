import React from "react";
import {create} from 'react-test-renderer'
import {updateUserStatus} from "../../../redux/profileReducer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={"new one"} updateUserStatus={updateUserStatus}/>);
        const instance = component.getInstance()
        expect(instance?.props.status).toBe('new one')
    })
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status={"new one"} updateUserStatus={updateUserStatus}/>);
        const instance = component.root
        let span = instance?.findByType('span')
        expect(span).toBeDefined()
    })
    test('after creation span with correct status should be displayed', () => {
        const component = create(<ProfileStatus status={"bla-bla"} updateUserStatus={updateUserStatus}/>);
        const instance = component.root
        let span = instance?.findByType('span')
        expect(span?.children[0]).toBe('bla-bla')
    })
    test('input should be diplayed in editmode', () => {
        const component = create(<ProfileStatus status={"bla-bla"} updateUserStatus={updateUserStatus}/>);
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe("bla-bla")
    })
    test('callback should be called', () => {
        const callback = jest.fn()
        const component = create(<ProfileStatus status={"bla-bla"} updateUserStatus={callback}/>);
        let instance = component.getInstance()
        //@ts-ignore
        instance?.deactivateEditMode()
        expect(callback.mock.calls.length).toBe(1)
    })
})