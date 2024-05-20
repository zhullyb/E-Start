import request from "./request";

export const reqChat = async (
    question: string
) => {
    return request({
        url: "/ai/chat",
        method: "POST",
        data: {
            question
        }
    })
}