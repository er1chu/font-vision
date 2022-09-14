import type { NextPage } from 'next'
import type * as React from 'react'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'

import { usesResultsApi } from '@/common/api-types'
import Layout from '@/components/layout'
import FontUseUnit from '@/components/font-use-unit'
import { Suspense } from 'react'
import { QueryErrorResetBoundary } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

// TODO: 'do page params for uses, get that out of way for infinite query
// TODO: Infinite query
// TODO: suspense error boundary

const UsesResults: NextPage = () => {
  return (
    <Layout>
      <Uses />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await fetch('/api/uses')
  return { props: { posts } }
}

const Uses: React.FC = () => {
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses(undefined, { retry: 0, staleTime: Infinity })
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
            // <Suspense fallback={<div>Loading</div>} key={useIndex}>
            <FontUseUnit
              fontFamilies={font_families}
              thumb={thumb}
              useIndex={useIndex}
              key={useIndex}
              contributor={contributor}
              tags={tags}
              designers={designers}
            />
            // </Suspense>
          ))}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default UsesResults
