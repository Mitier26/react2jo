import { useQuery } from "@tanstack/react-query"
import api from "../utils/tourApi"


const fetchFestivalInfo = (id) => {
    return api.get(`/detailInfo1?contentId=${id}&contentTypeId=15`)
}

export const useFestivalInfo = (id) => {
    return useQuery({
        queryKey:['festival-info',id],
        queryFn:()=>fetchFestivalInfo(id),
        select:(result)=>result.data.response
    })
}