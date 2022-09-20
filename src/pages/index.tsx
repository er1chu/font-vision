import type { NextPage } from 'next'
import type * as React from 'react'
import type { UsesResults, Use } from '@/common/api-types'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi, usesResults as usesResultsValidation } from '@/common/api-types'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

import Layout from '@/components/layout'
import FontUseUnit from '@/components/font-use-unit'
import LoadingScreen from '@/components/loading-screen'
import LoadingModal from '@/components/loading-modal'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

const UsesResults: NextPage = () => {
  return (
    <Layout>
      <Uses />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Layout>
  )
}

const Uses: React.FC = () => {
  //TODO if filter, make header componetn the tinier one for scrollTop
  const [filter, setFilter] = useState<undefined | Use>()

  const filterByUse = (use: Use | undefined, array: Array<Use>, useIndex: number) => {
    setFilter(use) // set filter to use tags
    // window.scrollTo(0, 0)
    array.splice(useIndex, 1) // remove use from list
  }

  const { ref, inView } = useInView()
  const page = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const {
    data: uses,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usesClientHooks.useInfiniteQuery(
    '/uses',
    { queries: { page: 1, count: 30 }, retry: 0, staleTime: Infinity, select: (data) => data.uses },
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
  useEffect(() => {
    if (filter) {
      scrollRef.current?.scrollIntoView()
      console.log('fired')
    }
  }, [filter])

  if (isLoading) return <LoadingScreen unitCount={30} />
  if (isError)
    return (
      <div className='min-w-screen col-span-2 flex min-h-screen items-center justify-center bg-green-100 text-7xl md:col-span-5'>
        Error :(
      </div>
    )
  return (
    <>
      {/* <LoadingModal visibility={isFetchingNextPage} /> */}
      {filter && (
        // when filter is set, move use to front of list
        <div ref={scrollRef}>
          <FontUseUnit
            fontFamilies={filter.font_families}
            thumb={filter.thumb}
            tags={filter.tags}
            designers={filter.designers}
            onClick={() => setFilter(filter)}
            contributor={filter.contributor}
          />
        </div>
      )}
      {uses?.pages.flatMap((page) =>
        page?.uses.map(({ id, font_families, thumb, contributor, tags, designers }, useIndex) => (
          <FontUseUnit
            fontFamilies={font_families}
            thumb={thumb}
            key={`${useIndex}-${id}`}
            contributor={contributor}
            tags={tags}
            designers={designers}
            onClick={() => filterByUse(page.uses[useIndex], page.uses, useIndex)}
          />
        ))
      )}
      {isFetchingNextPage && <LoadingScreen unitCount={30} />}
      <div
        ref={ref}
        onClick={() => {
          fetchNextPage()
          page.current = page.current + 1
        }}
        className='flex items-center justify-center bg-green-500 p-20 text-7xl lg:col-span-5'>
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
