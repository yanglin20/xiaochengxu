import {get} from '../utils/request'

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