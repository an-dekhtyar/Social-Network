

export const required = (value:string) => {
    if (value) return undefined;

    return 'Field is required!'
}
export const MaxValueCreator = (maxValue:number) => (value:string) => {
    if (value.length > maxValue) {
        return `Max value is ${maxValue} symbols`
    }
    return undefined
}
export {}