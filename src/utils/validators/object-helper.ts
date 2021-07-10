

export let updateObjectInArray = (items:any[], itemId:any, objPropName:any, newElement:any) => {

    return  items.map((u) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newElement}
        }
        return u
    })
}