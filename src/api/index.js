import {get,post} from '../utils/request'

import { APP_ID, APP_SECRET } from '../utils/const'

const  base = 'https://test.youbaobao.xyz:18081'

export function getHomeData(parmas){
    return get(`${base}/book/home/v2`,parmas)
}

export function recommend(){
    return get(`${base}/book/home/recommend/v2` )
}

export function freeRead(){
    return get(`${base}/book/home/freeRead/v2` )
}

export function hotBook(){
    return get(`${base}/book/home/hotBook/v2` )
}

export function getOpenId(code){

    return get(`${base}/openId/get`,{
        appId:APP_ID,
        secret: APP_SECRET,
        code:code
    })
}

export function register(openId,userInfo){

    return post(`${base}/user/register`,{
        openId,
        platform:mpvuePlatform,
        ...userInfo
        
    })


}