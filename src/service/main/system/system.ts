import jfwRequest from '@/service'
import { IDataType } from '@/service/type'

export function pageListReq(url: string, queryInfo: any) {
  return jfwRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    isShowLoading: true
  })
}
