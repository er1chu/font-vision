import { entitiesResults, usesResults } from '@/common/api-types'
import { entitiesSampleData, usesSampleData } from '@/common/sample-data'
enum StaticData {
  'entities' = 0,
  'uses' = 1,
  //   'detailedFamilies' = 2,
}

const dataSets = [entitiesResults.parse(entitiesSampleData), usesResults.parse(usesSampleData)]

const debugData = (setNumber: StaticData): void => {
  console.log(dataSets[setNumber])
}

export default debugData
