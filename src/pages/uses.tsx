import type { NextPage } from 'next'
import Head from 'next/head'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi } from '../common/api'

const queryClient = new QueryClient()
const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

const Header: React.FC = () => {
  return (
    <header className='relative grid grid-cols-5 gap-px bg-black p-[2px] text-xs font-medium'>
      <img src='/fv.svg' alt='font vision' className='col-span-1 bg-gray-200 p-2' />
      <div className='h-full bg-white p-2'>yell</div>
    </header>
  )
}

;<Head>
  <title>Font Vision</title>
  <meta name='description' content='Zodios app' />
  <link rel='icon' href='/favicon.ico' />
</Head>

const Uses = () => {
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <div className='max-w-screen grid grid-cols-5 gap-[2px] bg-black'>
      {uses?.uses.map((use) => (
        <>
          {use.font_families.map((font, index) => (
            <div className='aspect-[0.8] bg-white text-xs font-medium' key={index}>
              <div className='px-2 text-right'>{font.use_count}</div>
              <img src={font.sample_src} alt={font.name} />
            </div>
          ))}
        </>
      ))}
    </div>
  )
}

const UsesResults: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full bg-gray-200'>
        <Head>
          <title>Font Vision</title>
          <meta name='description' content='Zodios app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <Uses />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default UsesResults
