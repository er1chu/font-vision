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
      {uses?.uses.map(({ font_families, thumb }, index) => (
        <div
          className='group flex aspect-[0.8] flex-col overflow-hidden rounded-lg odd:bg-[#b9ff00] even:bg-[#FFE0F8] hover:cursor-pointer'
          key={index}>
          <div>
            {font_families.slice(0, 3).map(({ name, sample_src, use_count }, index) => (
              <img className='max-w-full border-b border-black even:bg-white' src={sample_src} alt={name} key={index} />
            ))}
          </div>
          <img
            className='object-cover opacity-100 group-hover:opacity-20'
            src={thumb}
            loading='lazy'
            alt={`Design featuring ${font_families[0]?.name}`}
          />
        </div>
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
