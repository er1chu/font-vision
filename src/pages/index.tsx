import type { NextPage } from 'next'
import type * as React from 'react'
import type { UsesResults } from '@/common/api-types'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi, usesResults as usesResultsValidation } from '@/common/api-types'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import Layout from '@/components/layout'
import FontUseUnit from '@/components/font-use-unit'
import LoadingScreen from '@/components/loading-screen'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

const UsesResults: NextPage = () => {
  return (
    <Layout>
      <Uses />
      <ReactQueryDevtools initialIsOpen={false} />
    </Layout>
  )
}

const Uses: React.FC = () => {
  const { ref, inView } = useInView()
  const page = useRef(1)
  const {
    data: uses,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usesClientHooks.useInfiniteQuery(
    '/uses',
    { queries: { page: 1, count: 30 }, retry: 0, staleTime: Infinity },
    {
      getPageParamList: () => {
        return ['page']
      },
      getNextPageParam: () => {
        return {
          queries: {
            page: page.current + 1,
          },
        }
      },
    }
  )
  useEffect(() => {
    if (inView) {
      fetchNextPage()
      page.current += 1
    }
  }, [inView, fetchNextPage])

  if (isLoading) return <LoadingScreen unitCount={30} />
  if (isError)
    return (
      <div className='min-w-screen col-span-2 flex min-h-screen items-center justify-center bg-green-100 text-7xl md:col-span-5'>
        Error :(
      </div>
    )
  return (
    <>
      {uses?.pages.flatMap((page) =>
        page?.uses.map(({ font_families, thumb, contributor, tags, designers }, useIndex) => (
          <FontUseUnit
            fontFamilies={font_families}
            thumb={thumb}
            useIndex={useIndex}
            key={useIndex}
            contributor={contributor}
            tags={tags}
            designers={designers}
          />
        ))
      )}
      <div
        ref={ref}
        onClick={() => {
          fetchNextPage()
          page.current = page.current + 1
        }}
        className='col-span-5 flex items-center justify-center bg-green-500 p-20 text-7xl'>
        {isFetchingNextPage ? (
          <div className='animate-pulse'>Loading more fonts...</div>
        ) : hasNextPage ? (
          'Load more fonts'
        ) : (
          'No more fonts :('
        )}
      </div>
    </>
  )
}
export default UsesResults
