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

export const reqSelectTask = async ( id: number ) => {
    return request({
        url: "/task/select",
        method: "POST",
        data: {
            id
        }
    })
}

export const reqTaskStage = async ( id: number ) => {
    return request({
        url: "/task/stage",
        method: "GET",
        params: {
            id
        }
    })
}

export const updTaskStage = async (data: {
    loc?: string,
    pic?: string,
}) => {
    return request({
        url: "/task/stage",
        method: "PUT",
        data
    })
}

export const reqReview = async (data: {
    loc?: string,
    pic?: string,
}) => {
    return request({
        url: "/task/review",
        method: "POST",
        data
    })
}

export const reqTask = async (id: number) => {
    return request({
        url: "/task",
        method: "GET",
        params: {
            id
        }
    })
}