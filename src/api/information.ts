import request from "./request";

export const reqInformation = async () => {
    return request({
        url: "/information",
        method: "GET"
    })
}