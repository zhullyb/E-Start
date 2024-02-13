import request from "./request";

export const reqLogin = async (code: string) => {
    return request({
        url: "/login",
        method: "POST",
        data: {
            code
        }
    })
}