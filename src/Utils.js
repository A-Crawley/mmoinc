export const Delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const ToObjectList = (object) => {
    return Object.keys(object).map((key, index) => ({
        key: index,
        ...object[key]
    }))
}