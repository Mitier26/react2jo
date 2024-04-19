import { useQuery } from '@tanstack/react-query'
import api from '../utils/tourApi'

// 캠핑의 정보를 가지고 오는 것
// x좌표, y좌표, 범위( 최대 20000 : 20Km)
const fetchCamping = (mapX, mapY, radius) => {
   const params = {
      ...api.defaults.params, // 기본 매개변수 가져오기
      mapX,
      mapY,
      radius,
   }

   return api.get('/locationBasedList1', { params })
}

export const useCampingQuery = (mapX, mapY, radius) => {
   return useQuery({
      queryKey: ['camping_query', mapX, mapY, radius],
      queryFn: () => fetchCamping(mapX, mapY, radius),
   })
}
