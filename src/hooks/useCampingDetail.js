import { useQuery } from "@tanstack/react-query";
import campingApi from "../utils/campingApi";




export const useCampingDetail = ({params,keyword}) =>{
    return useQuery({
        queryKey:['camping-detail',{params,keyword}],
        queryFn: () => {
            return campingApi.get(`/searchList?MobileOS=ETC&MobileApp=AppTest&keyword=${encodeURI(keyword)}&_type=json`);
        },
        select:(result)=>result.data.response.body.items.item,
    })
}