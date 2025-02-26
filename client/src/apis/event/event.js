import axios from "../../axios";

export const apiGetEventById =(eid)=>axios({
    url:`/event/${eid}`,
    method:'get'
})

export const apiGetEventByCategoryName =(name) =>axios({
    url:`/event/category?category=${name}`,
    method:'get'
})