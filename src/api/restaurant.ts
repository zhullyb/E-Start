import request from "./request";

export const reqBusinessList = async (sort?: number) => {
    return request({
        url: "/businessList",
        method: "GET",
        params: {
            "page": 1,
            "pageSize": 100,
            "sort": sort ? sort : 1
        }
    })
}

export const reqBusiness = async (id: number) => {
    return request({
        url: "/business",
        method: "GET",
        params: {
            id
        }
    })
}

export const reqCouponList = async (id: number, cate?: number) => {
    return request({
        url: "/business/couponList",
        method: "GET",
        params: {
            id,
            "category": cate ? cate : 1
        }
    })
}

export const redeemCoupon = async (id: number) => {
    return request({
        url: "/business/coupon/redeem",
        method: "POST",
        data: {
            id
        }
    })
}