import { useQuery } from '@tanstack/react-query'
import api from '../utils/tourApi'

// 축제의 정보를 가지고 오는 것
const fetchFestival = (eventStartDate) => {
   const params = {
      ...api.defaults.params, // 기본 매개변수 가져오기
      eventStartDate,
   }

   return api.get('/searchFestival1', { params })
}

export const useFestivalQuery = (eventStartDate) => {
   return useQuery({
      queryKey: ['festival_query', eventStartDate],
      queryFn: () => fetchFestival(eventStartDate),
      select: (result) => result.data.response.body.items.item,
   })
}
