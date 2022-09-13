import type { NextPage } from 'next'
import type { FontFamily, Contributor } from '@/common/api-types'
import type * as React from 'react'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { scroll, animate } from 'motion'
import { useRef } from 'react'

import { usesResultsApi } from '@/common/api-types'
import Layout from '@/components/layout'
import { useIsomorphicEffect } from '@/hooks/use-isomorphic-layout-effect'

interface FontUseProps {
  useIndex: number
  fontFamilies: Array<FontFamily>
  thumb: string
  contributor: Contributor
}

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
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses()
  if (isLoading)
    return (
      <div className='min-w-screen col-span-2 flex min-h-screen items-center justify-center bg-green-100 text-7xl md:col-span-5'>
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
      {uses?.uses.map(({ font_families, thumb, contributor }, useIndex) => (
        <FontUseUnit
          fontFamilies={font_families}
          thumb={thumb}
          useIndex={useIndex}
          key={useIndex}
          contributor={contributor}
        />
      ))}
    </>
  )
}

const FontUseUnit: React.FC<FontUseProps> = ({ useIndex, fontFamilies, thumb, contributor }) => {
  const animationRef = useRef<Element>(null) as React.MutableRefObject<Element>
  const layoutEffect = useIsomorphicEffect()
  layoutEffect(() => {
    scroll(
      animate(
        animationRef.current,
        {
          opacity: [0.5, 1, 1, 1],
          scale: [0.8, 1, 1, 1],
          borderRadius: ['10%', '0%', '0%', '0%'],
        },
        { easing: 'ease-in-out' }
      ),
      {
        target: animationRef.current,
        offset: ['start end', 'end end', 'start start', 'end start'],
      }
    )
  })
  return (
    <div
      ref={animationRef as React.RefObject<HTMLDivElement>}
      className='family-unit group flex aspect-[0.8] flex-col overflow-hidden rounded-lg odd:bg-[#b9ff00] even:bg-[#FFE0F8] hover:cursor-pointer'>
      <div>
        {fontFamilies.slice(0, 3).map(({ name, sample_src, use_count }, fontIndex) => (
          <img
            className='max-w-full border-b border-black even:bg-white'
            src={sample_src}
            alt={name}
            key={fontIndex}
            loading={useIndex < 10 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <div className='relative h-full w-full self-stretch'>
        <img
          className='group-hover:opacity-2 min-h-full min-w-full flex-shrink-0 object-cover opacity-100 transition-all'
          src={thumb}
          loading='lazy'
          alt={`Design featuring ${fontFamilies[0]?.name || 'an unidentified font'}`}
        />
        <div className='absolute top-0 left-0 z-20 h-1/3 w-full bg-gradient-to-b from-gray-700 p-2 text-xs'>
          <span className='rounded-full px-2 text-xs text-white shadow-2xl hover:bg-black'>
            {contributor.pretty_name}
          </span>
        </div>
      </div>
    </div>
  )
}
export default UsesResults
