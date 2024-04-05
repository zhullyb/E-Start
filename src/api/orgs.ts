import request from "./request";

export const reqOrganizationList = async(
    category?: number,
    sort?: number
) => {
    return request({
        url: "/organizationList",
        method: "GET",
        params: {
            page: 1,
            pageSize: 100,
            category: category ? category : 1,
            sort: sort ? sort : 1
        }
    })
}