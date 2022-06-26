export const Delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const ToObjectList = (object) => {
    return Object.keys(object).map((key, index) => ({
        key: index,
        ...object[key]
    }))
}

/**
 * 
 * @param {Date} date 
 */
export const FormatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    

    return `${day}/${month}/${year}`;
}

/**
 * 
 * @param {Date} date 
 */
export const FormatTime = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return `${hour}:${minute}:${second}`;
}