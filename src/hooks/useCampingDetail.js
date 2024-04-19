import { useQuery } from "@tanstack/react-query";
import campingApi from "../utils/campingApi";



export const useCampingDetail = ({params}) =>{
    return useQuery({
        queryKey:['camping-detail',{params}],
        queryFn: () => {
            return campingApi.get(`/content/${params}`)
        },
        select:(result)=>result.data
    })
}