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

export const reqStudentInfo = async () => {
    return request({
        url: "/user/studentInfo",
        method: "GET"
    })
}

export const reqInfo = async () => {
    return request({
        url: "/user/info",
        method: "GET"
    })
}

export const updInfo = async (data: {
    username: string,
    signature: string,
    hobby: string,
    avatar: string
}) => {
    return request({
        url: "/user/info",
        method: "PUT",
        data
    })
}