import type { NextPage } from 'next'
import Head from 'next/head'
import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi } from '../common/api'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()
const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('myAPI', usesClientApi)

const Users = () => {
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses()

  return (
    <div>
      <button>Add User</button>
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
          <meta name='description' content='Zodios app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>Users</h1>
        <Users />
      </div>
    </QueryClientProvider>
  )
}

export default Home
