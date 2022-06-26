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
    let day = String(date.getDate()).padStart(2,0);
    let month = String(date.getMonth()).padStart(2,0);
    let year = String(date.getFullYear());

    

    return `${day}/${month}/${year}`;
}

/**
 * 
 * @param {Date} date 
 */
export const FormatTime = (date) => {
    let hour = String(date.getHours() % 12 === 0 ? 12 : date.getHours() % 12).padStart(2,0);
    let minute = String(date.getMinutes()).padStart(2,0);
    let second = String(date.getSeconds()).padStart(2,0);

    let suffix = date.getHours() >= 12 ? 'pm' : 'am'

    return `${hour}:${minute}:${second} ${suffix}`;
}