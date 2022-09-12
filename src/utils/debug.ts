import { entitiesResults, usesResults } from '@/common/api'
import * as entitiesData from '@/lib/sampleData/entities.json'
import * as usesData from '@/lib/sampleData/uses.json'

enum StaticData {
  'entities' = 0,
  'uses' = 1,
  //   'detailedFamilies' = 2,
}

const dataSets = [entitiesResults.parse(entitiesData), usesResults.parse(usesData)]

const debugData = (setNumber: StaticData): void => {
  console.log(dataSets[setNumber])
}

export default debugData
