import type { NextPage } from 'next'
import type { FontFamily } from '../common/api'
import type { RefObject, MutableRefObject } from 'react'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { usesResultsApi } from '../common/api'
import Layout from '../components/Layout'
import React, { useEffect } from 'react'
import { scroll, animate, stagger } from 'motion'
import { useRef } from 'react'
interface FontUseProps {
  useIndex: number
  fontFamilies: Array<FontFamily>
  thumb: string
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

const Uses = () => {
  const { data: uses, isLoading, isError } = usesClientHooks.useGetUses()
  if (isLoading) return <div className='min-w-screen min-h-screen bg-green-100'>Loading Fonts...</div>
  if (isError) return <div>Error</div>
  return (
    <>
      {uses?.uses.map(({ font_families, thumb }, useIndex) => (
        <FontUseUnit fontFamilies={font_families} thumb={thumb} useIndex={useIndex} key={useIndex} />
      ))}
    </>
  )
}

const FontUseUnit: React.FC<FontUseProps> = ({ useIndex, fontFamilies, thumb }) => {
  const animationRef = useRef<Element>(null) as MutableRefObject<Element>
  useEffect(() => {
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
      ref={animationRef as RefObject<HTMLDivElement>}
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
      <img
        className='group-hover:opacity-2 object-cover opacity-100 transition-all'
        src={thumb}
        loading='lazy'
        alt={`Design featuring ${fontFamilies[0]?.name}`}
      />
    </div>
  )
}
export default UsesResults
