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
    phoneNumber :/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/
}