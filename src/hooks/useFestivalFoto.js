import { useQuery } from "@tanstack/react-query"
import api from "../utils/tourApi"

const fetchFestivalFoto = (id) => {
    return api.get(`/detailCommon1?contentId=${id}&defaultYN=Y&firstImageYN=Y&overviewYN=Y&mapinfoYN=Y`)
}

export const useFestivalFoto = (id) =>{
    return useQuery({
        queryKey:['festival-foto',id],
        queryFn:()=>fetchFestivalFoto(id),
        select:(result)=>result.data.response
    })
}