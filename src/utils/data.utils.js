export function concurrencyFormat(number){
    return number?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export function getFormValues(formData){
    let result = {}
    Object.keys(formData).forEach(key=>{
        result[key] = formData[key].value
    })
    return result
}

export const regex = {
    username:/[a-zA-Z0-9\ ]{3,15}/,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/,
    email:/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    phoneNumber :/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
    otp:/^[0-9]+$/
}

export function camelToSnakeCase(object) {
    let newObject = {};
    Object.keys(object).forEach((key) => {
        let newKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        if (Array.isArray(object[key])) {
            newObject[newKey] = object[key]
            return
        }
        if (typeof object[key] === 'object' && object[key] !== null) {
            newObject[newKey] = camelToSnakeCase(object[key]);
        } else {
            newObject[newKey] = object[key];
        }
    });
    return newObject;
}

export function snakeToCamelCase(object) {
    let newObject = {};
    let newKey;
    Object.keys(object).forEach((key) => {
        if (key === '_id') {
            newKey = key;
            newObject[newKey] = object[key];
        } else {
            newKey = key?.replace(/(_\w)/g, (k) => k[1].toUpperCase());
            if (Array.isArray(object[key])) {
                newObject[newKey] = object[key]
                return
            }
            if (typeof object[key] === 'object' && object[key] !== null) {
                newObject[newKey] = snakeToCamelCase(object[key]);
            } else {
                newObject[newKey] = object[key];
            }
        }
    });
    return newObject;
} 

function removeNullOrUndefined(obj){
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => {
        if (Array.isArray(v)) {
            return v.length
        } 
        return v != null || v != ''
    } ));
}

function removeEmptyList(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => {
        if (Array.isArray(v)) {
            return v.length
        } else {
            return true
        }
    }));
}