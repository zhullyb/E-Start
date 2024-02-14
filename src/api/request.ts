import axios from "axios"
import { UniAdapter } from "uniapp-axios-adapter"

const request = axios.create({
    baseURL: "https://api.lonesome.cn/api/wx",
    adapter: UniAdapter
})

request.defaults.headers.common['Authorization'] = "Bearer " + uni.getStorageSync("access_token");

request.interceptors.response.use((response) => {
    if (response.status === 401) {
        // try to refresh accessToken and
        // retry the request
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
        url: "https://api.lonesome.cn/api/wx/refresh_token",
        method: "POST",
        header: {
            "Authorization": "Bearer " + uni.getStorageSync("refresh_token")
        },
        success: (res: any) => {
            if (res.data.code === 200) {
                uni.setStorageSync("access_token", res.data.data.access_token);
                uni.setStorageSync("refresh_token", res.data.data.refresh_token);
                request.defaults.headers["Authorization"] = "Bearer " + res.data.data.access_token;
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