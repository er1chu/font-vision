import { entitiesResults, usesResults } from '@/common/api-types'
import * as entitiesData from '@/common/sample-data/entities.json'
import * as usesData from '@/common/sample-data/uses.json'
import * as detailedFamilies from '@/common/sample-data/detailed-family.json'

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
