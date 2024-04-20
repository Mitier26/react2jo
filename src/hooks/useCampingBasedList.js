import { useQuery } from '@tanstack/react-query'
import campingApi from '../utils/campingApi'

const fetchCampingBasedList = () => {
   return campingApi.get('/basedList?')
}

export const useCampingBasedList = () => {
   return useQuery({
      queryKey: ['camping-based'],
      queryFn: fetchCampingBasedList,
      select: (result) => result.data,
   })
}
