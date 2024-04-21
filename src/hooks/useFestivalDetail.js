import { useQuery } from "@tanstack/react-query"
import api from "../utils/tourApi"


const fetchFestivalDetail = (id) => {
    return api.get(`detailIntro1?contentId=${id}&contentTypeId=15`)
}

export const useFestivalDetail = (id) => {
    return useQuery({
        queryKey:['festival-detail-info',id],
        queryFn:()=>fetchFestivalDetail(id),
        select:(result)=>result.data.response
    })
}