//  编写常量，用于规范type
export const USER_LOGIN_INFO = 'USER_LOGIN_INFO'

export function userlogin(telNumber){
    return {
        type:USER_LOGIN_INFO,
        payload:telNumber
    }
}




export default {
    userlogin
}