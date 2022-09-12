import type { NextPage } from 'next'
import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'

import { entitiesResultsApi } from '@/common/api'
import Layout from '@/components/Layout'
import DisplayUnit from '@/components/DisplayUnit'

const entitiesClientApi = new Zodios('/api', entitiesResultsApi)
const entitiesClientHooks = new ZodiosHooks('entities', entitiesClientApi)

const Entities = () => {
  const { data: entities, isLoading, isError } = entitiesClientHooks.useGetEntities()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <>
      {entities?.type_entities.map((entity, index) => (
        <>
          {entity.sample_src && (
            <DisplayUnit name={entity.name} sampleSrc={entity.sample_src} useCount={entity.use_count} key={index} />
          )}
        </>
      ))}
    </>
  )
}

const EntitiesResults: NextPage = () => {
  return (
    <Layout>
      <Entities />
    </Layout>
  )
}

export default EntitiesResults
