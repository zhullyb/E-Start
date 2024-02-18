import request from "./request";

export const reqTaskList = async ( data : {
    category: number,
    isCompleted: number
}) => {
    return request({
        url: "/taskList",
        method: "GET",
        params: {
            page: 1,
            pageSize: 100,
            ...data
        }
    })
}