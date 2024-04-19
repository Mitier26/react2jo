import { useQuery } from '@tanstack/react-query'
import campingApi from '../utils/campingApi'

const fetchSearchCamping = ({ keyword, pageNo }) => {
   return keyword ? campingApi.get(`/searchList?&pageNo=${pageNo}&keyword=${encodeURI(keyword)}`) : campingApi.get(`/basedList?&pageNo=${pageNo}`)
}

export const useSearchCampingQuery = ({ keyword, pageNo }) => {
   return useQuery({
      queryKey: ['camping-search', { keyword, pageNo }],
      queryFn: () => fetchSearchCamping({ keyword, pageNo }),
      select: (result) => result.data,
   })
}
