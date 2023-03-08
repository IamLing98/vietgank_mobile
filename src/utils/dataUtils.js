export function concurrencyFormat(number){
    return number?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

