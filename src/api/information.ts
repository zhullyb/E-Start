import request from "./request";

export const reqInformation = async (category: number) => {
    return request({
        url: "/informationList",
        method: "GET",
        params: {
            page: 1,
            pageSize: 20,
            category
        }
    })
}