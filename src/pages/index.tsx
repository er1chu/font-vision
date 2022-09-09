import type { NextPage } from 'next'
import Head from 'next/head'
import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi } from '../common/api'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()
const usesClientApi = new Zodios(
  'http://localhost:3000/api/uses',
  usesResultsApi
)
const usesClientHooks = new ZodiosHooks('/api', usesClientApi)

const Users = () => {
  const { data: uses } = usesClientHooks.useGetUses()
  console.log(uses)
  return (
    <div>
      {uses?.uses.map((use) => (
        <div key={use.id}>{use.id}</div>
      ))}
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Head>
          <title>Zodios Example App</title>
          <meta name="description" content="Zodios app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Users</h1>
        <Users />
      </div>
    </QueryClientProvider>
  )
}

export default Home
