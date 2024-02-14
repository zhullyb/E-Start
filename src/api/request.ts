import axios from "axios"
import { UniAdapter } from "uniapp-axios-adapter"

const request = axios.create({
    baseURL: "https://api.lonesome.cn/api/wx",
    adapter: UniAdapter
})

request.interceptors.request.use((config: any) => {
    config.headers["Authorization"] = "Bearer " + uni.getStorageSync("access_token");
    console.log(config)
    return config;
})

request.interceptors.response.use((response) => {
    if (response.data.code === 200113) {
        doRefreshToken()
        return request(response.config)
    }

    if ( response.status !== 200 && response.data.code !== 0) {
        console.log("===== Axios Received an Exception Response (Start) =====")
        console.log(response)
        console.log("===== Axios Received an Exception Response (End) =====")
    }
    return response
})

const doRefreshToken = () => {
    uni.request({
        url: "https://api.lonesome.cn/api/wx/refresh-token",
        method: "POST",
        header: {
            "Authorization": "Bearer " + uni.getStorageSync("refresh_token")
        },
        success: (res: any) => {
            const data = JSON.parse(res.data)
            if (data.code === 200) {
                uni.setStorageSync("access_token", data.data.access_token);
                uni.setStorageSync("refresh_token", data.data.refresh_token);
            }
        },
        fail: () => {
            uni.reLaunch({
                url: "/pages/login/index"
            })
        }
    })
}

export default request