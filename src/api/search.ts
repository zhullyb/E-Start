import request from "./request";

export const reqHotKeywords = async () => {
    return request({
        url: "/search/hotKeywords",
        method: "GET"
    })
}