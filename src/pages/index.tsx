import type { NextPage } from 'next'
import type * as React from 'react'
import type { UsesResults } from '@/common/api-types'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'

import { usesResultsApi, usesResults as usesResultsValidation } from '@/common/api-types'
import Layout from '@/components/layout'
import FontUseUnit from '@/components/font-use-unit'

import { QueryErrorResetBoundary, useQuery, QueryClientProvider, QueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

// TODO: 'do page params for uses, get that out of way for infinite query
// TODO: Infinite query
// TODO: suspense error boundary

const UsesResults: NextPage = () => {
  // console.log(usesInitial)
  return (
    <Layout>
      <Uses />
    </Layout>
  )
}

// export async function getServerSideProps() {
//   const baseUrl = `http://localhost:3000/api/uses`
//   const parsedResponse = await fetch(baseUrl).then((response) => response.json())
//   const initialResponse = usesResultsValidation.parse(parsedResponse)
//   return { props: { initialResponse } }
// }

const Uses: React.FC = () => {
  const {
    data: uses,
    isLoading,
    isError,
  } = useQuery('/uses', usesClientApi.getUses, {
    staleTime: Infinity,
    retry: 0,
  })
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
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}>
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
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default UsesResults
