import axios from "axios"
import { UniAdapter } from "uniapp-axios-adapter"
import jsrsasign from "jsrsasign"

const request = axios.create({
    baseURL: "https://api.lonesome.cn/api/wx",
    adapter: UniAdapter
})

request.interceptors.request.use( async (config: any) => {
    const access_token = uni.getStorageSync("access_token")

    if (access_token && isTokenExpired(access_token)) {
        try {
            const res = await uni.request({
                url: "https://api.lonesome.cn/api/wx/refreshToken",
                method: "POST",
                header: {
                    "Authorization": "Bearer " + uni.getStorageSync("refresh_token")
                }
            }) as any;

            uni.setStorageSync("access_token", res.data.data.accessToken);
            uni.setStorageSync("refresh_token", res.data.data.refreshToken);
            config.headers["Authorization"] = "Bearer " + res.data.data.accessToken;
            return config;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            uni.reLaunch({
                url: "/pages/login/index"
            });
        }
    } else {
        config.headers["Authorization"] = "Bearer " + access_token
        return config;
    }
})

request.interceptors.response.use((response) => {
    if (response.status !== 200 && response.data.code !== 0) {
        console.log("===== Axios Received an Exception Response (Start) =====")
        console.log(response)
        console.log("===== Axios Received an Exception Response (End) =====")
    }
    return response
})

const isTokenExpired = (token: string) => {
    if (!token) {
        return true
    }
    const jwt = jsrsasign.KJUR.jws.JWS.parse(token)
    const exp = (jwt.payloadObj as { exp: number }).exp
    const now = Math.floor(new Date().getTime() / 1000)
    return now >= exp
}

export default request