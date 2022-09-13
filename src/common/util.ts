import { entitiesResults, usesResults } from '@/common/api-types'
import { entitiesSampleData, usesSampleData } from '@/common/sample-data'

enum StaticData {
  'entities' = 0,
  'uses' = 1,
  //   'detailedFamilies' = 2,
}

const dataSets = [entitiesResults.parse(entitiesSampleData), usesResults.parse(usesSampleData)]

export const debugData = (setNumber: StaticData): void => {
  console.log(dataSets[setNumber])
}

export const splitArrayIntoGroups = (data: Array<unknown>, itemsPerGroup: number) => {
  const group: Array<Array<unknown>> = []
  for (let i = 0, j = 0; i < data.length; i++) {
    if (i >= itemsPerGroup && i % itemsPerGroup === 0) j++
    group[j] = group[j] || []
    group[j]?.push(data[i])
  }
  return group
}
