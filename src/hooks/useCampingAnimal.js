import { useQuery } from "@tanstack/react-query"
import campingApi from "../utils/campingApi"

const fetchCampingAnimal = () => {
    return campingApi.get('/basedList?numOfRows=100')
}

export const useCampingAnimal = () => {
    return useQuery({
        queryKey:['camping-animal'],
        queryFn:fetchCampingAnimal,
        select:(result)=>result.data
    })
}