import axios from "axios"
import { UniAdapter } from "uniapp-axios-adapter"
import Amapkey from "./Amapkey"

const amapRequest = axios.create({
    baseURL: "https://restapi.amap.com/v3/",
    adapter: UniAdapter,
    timeout: 2000,
    params: {
        key: Amapkey
    }
})

const getAdcode = async () => {
    const res = await amapRequest.get("ip")

    if (res.status === 200) {
        return res.data.adcode
    }
}

const getWeatherEmoji = (weather: string) => {
    switch (weather) {
        case '晴':
            return '☀️';
        case '少云':
        case '晴间多云':
            return '🌤️';
        case '多云':
            return '☁️';
        case '阴':
            return '🌥️';
        case '风':
        case '平静':
        case '微风':
        case '和风':
        case '清风':
        case '强风/劲风':
        case '疾风':
        case '大风':
        case '烈风':
            return '💨';
        case '风暴':
        case '狂爆风':
        case '飓风':
        case '热带风暴':
            return '🌪️';
        case '霾':
        case '中度霾':
        case '重度霾':
        case '严重霾':
            return '🌫️';
        case '阵雨':
        case '雷阵雨':
        case '雷阵雨并伴有冰雹':
        case '小雨':
        case '中雨':
        case '大雨':
        case '暴雨':
        case '大暴雨':
        case '特大暴雨':
        case '强阵雨':
        case '强雷阵雨':
        case '极端降雨':
        case '毛毛雨/细雨':
        case '雨':
        case '小雨-中雨':
        case '中雨-大雨':
        case '大雨-暴雨':
        case '暴雨-大暴雨':
        case '大暴雨-特大暴雨':
            return '🌧️';
        case '雨雪天气':
        case '雨夹雪':
        case '阵雨夹雪':
        case '冻雨':
            return '🌨️';
        case '雪':
        case '阵雪':
        case '小雪':
        case '中雪':
        case '大雪':
        case '暴雪':
            return '❄️';
        case '小雪-中雪':
        case '中雪-大雪':
        case '大雪-暴雪':
            return '🌨️';
        case '浮尘':
        case '扬沙':
        case '沙尘暴':
        case '强沙尘暴':
            return '💨';
        case '龙卷风':
            return '🌪️';
        case '雾':
        case '浓雾':
        case '强浓雾':
        case '轻雾':
        case '大雾':
        case '特强浓雾':
            return '🌫️';
        default:
            if (weather.includes("云")) {
                return '☁️'
            } else if (weather.includes('雨')) {
                return '🌧️'
            } else if (weather.includes('雪')) {
                return '❄️'
            } else if (weather.includes('雾')) {
                return '🌫️'
            } else if (weather.includes('霾')) {
                return '🌫️'
            } else if (weather.includes('尘')) {
                return '🌫️'
            } else if (weather.includes('风')) {
                return '💨'
            } else {
                return '❓'
            }
    }
}


const getWeather = async () => {
    const adcode = await getAdcode()
    const res = await amapRequest.get("weather/weatherInfo", {
        params: {
            city: adcode
        }
    })

    const weather = getWeatherEmoji(res.data.lives[0].weather)
    return {
        weather,
        temperature: res.data.lives[0].temperature_float
    }
}

export default getWeather