import type { NextPage } from 'next'
import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi } from '../common/api'
import Layout from '../components/Layout'
import DisplayUnit from '../components/DisplayUnit'
import { useEffect } from 'react'
import { scroll, animate, stagger } from 'motion'
import { z } from 'zod'

const usesClientApi = new Zodios('/api', usesResultsApi)
const usesClientHooks = new ZodiosHooks('uses', usesClientApi)

const Uses = () => {
  useEffect(() => {
    document.querySelectorAll('.family-unit').forEach((target) => {
      scroll(animate(target, { scale: [0.5, 1, 1, 0.5] }, { delay: 0.2 }), {
        target: target,
        offset: ['start end', 'end end', 'start start', 'end start'],
      })
    })
  })
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses()
  if (isLoading) return <div className='min-w-screen min-h-screen bg-green-100'>Loading Fonts...</div>
  if (isError) return <div>Error</div>
  return (
    <>
      {uses?.uses.map(({ font_families, thumb }, useIndex) => (
        <div
          className='family-unit group flex aspect-[0.8] flex-col overflow-hidden rounded-lg odd:bg-[#b9ff00] even:bg-[#FFE0F8] hover:cursor-pointer'
          key={useIndex}>
          <div>
            {font_families.slice(0, 3).map(({ name, sample_src, use_count }, fontIndex) => (
              <img
                className='max-w-full border-b border-black even:bg-white'
                src={sample_src}
                alt={name}
                key={fontIndex}
                loading={useIndex < 10 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
          <img
            className='group-hover:opacity-2 object-cover opacity-100 transition-all'
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
