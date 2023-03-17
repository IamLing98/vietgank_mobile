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