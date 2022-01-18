import { coordinateData } from './coordinate-data'

export function convertData(data: any) {
  const result = []

  for (const item of data) {
    const geoCoord = coordinateData[item.name]
    if (geoCoord) {
      result.push({
        name: item.name,
        value: geoCoord.concat(item.value)
      })
    }
  }

  return result
}
