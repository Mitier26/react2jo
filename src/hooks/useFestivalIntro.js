import { useQuery } from "@tanstack/react-query"
import api from "../utils/tourApi"



const fetchFestivalIntro = (id) => {
    console.log(id)
    return api.get(`/detailIntro1?contentId=${id}&contentTypeId=15`)
}

export const useFestivalIntro = (id) => {
    console.log(id)
    return useQuery({
        queryKey:['festival-intro',id],
        queryFn:()=>fetchFestivalIntro(id),
        select:(result)=>result.data.response
    })
}