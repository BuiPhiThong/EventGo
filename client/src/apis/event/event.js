import axios from "../../axios";

export const apiGetEventById =(eid)=>axios({
    url:`/event/${eid}`,
    method:'get'
})

export const apiGetEventByCategoryName =(name) =>axios({
    url:`/event/category?category=${name}`,
    method:'get'
})

export const apiGetAllEvent=()=>axios({
    url:`/event`,
    method:'get'
})

export const apiDeleteEvent= (eid) =>axios({
    url:`/event/${eid}`,
    method:'delete'
})

export const apiEventRegistation = (eventId)=> axios({
    url:'/user/regisevent',
    method:'post',
    data:{eventId}
})