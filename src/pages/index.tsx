import type { NextPage } from 'next'
import type * as React from 'react'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'

import { usesResultsApi } from '@/common/api-types'
import Layout from '@/components/layout'
import FontUseUnit from '@/components/font-use-unit'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

const UsesResults: NextPage = () => {
  return (
    <Layout>
      <Uses />
    </Layout>
  )
}

const Uses: React.FC = () => {
  const { data: uses, isLoading, isError } = usesClientHooks.useQuery('/uses')
  if (isLoading)
    return (
      <div className='min-w-screen lg:col-span5 col-span-2 flex min-h-screen items-center justify-center bg-green-100 text-7xl md:col-span-3'>
        Loading Fonts...
      </div>
    )
  if (isError)
    return (
      <div className='min-w-screen col-span-2 flex min-h-screen items-center justify-center bg-green-100 text-7xl md:col-span-5'>
        Error :(
      </div>
    )
  return (
    <>
      {uses?.uses.map(({ font_families, thumb, contributor, tags, designers }, useIndex) => (
        <FontUseUnit
          fontFamilies={font_families}
          thumb={thumb}
          useIndex={useIndex}
          key={useIndex}
          contributor={contributor}
          tags={tags}
          designers={designers}
        />
      ))}
    </>
  )
}

export default UsesResults
