/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const username: RegExp = /[a-zA-Z0-9\ ]{3,15}/;

/*
 * email validation
 */
export const email: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;



/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
 /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/
;

export const otp: RegExp =/^\d{6}$/;



export const phoneNumber: RegExp =/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/
;
