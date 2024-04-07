import request from "./request";

export const reqHotKeywords = async () => {
    return request({
        url: "/search/hotKeywords",
        method: "GET"
    })
}

export const reqSearch = async (keyword: string) => {
    return request({
        url: "/search",
        method: "GET",
        params: {
            page: 1,
            pageSize: 100,
            category: 1,
            content: keyword
        }
    })
}