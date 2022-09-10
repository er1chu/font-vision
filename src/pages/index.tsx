import type { NextPage } from 'next'
import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi } from '../common/api'
import Layout from '../components/Layout'
import DisplayUnit from '../components/DisplayUnit'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

const Uses = () => {
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <>
      {uses?.uses.map((use) => (
        <>
          {use.font_families.map((font, index) => (
            <DisplayUnit name={font.name} sampleSrc={font.sample_src} useCount={font.use_count} key={index} />
          ))}
        </>
      ))}
    </>
  )
}

const UsesResults: NextPage = () => {
  return (
    <Layout>
      <Uses />
    </Layout>
  )
}

export default UsesResults
