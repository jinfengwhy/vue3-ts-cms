import jfwRequest from '@/service'
import { IDataType } from '@/service/type'

export function pageListReq(url: string, queryInfo: any) {
  return jfwRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    isShowLoading: false
  })
}

export function pageDelDataReq(url: string) {
  return jfwRequest.delete<IDataType>({
    url: url
  })
}

export function pageAddDataReq(url: string, data: any) {
  return jfwRequest.post<IDataType>({
    url,
    data
  })
}

export function pageEditDataReq(url: string, data: any) {
  return jfwRequest.patch<IDataType>({
    url,
    data
  })
}
