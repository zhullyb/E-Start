import request from "./request";

export const reqVerify = async ( data:{
    name: string,
    idCard: string,
    admissionLetterId: string,
    facePic: string
}) => {
    return request({
        url: "/user/verify",
        method: "POST",
        data
    })
}