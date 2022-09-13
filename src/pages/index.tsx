import type { NextPage } from 'next'
import type { FontFamily, Contributor, Tag, Industry, Designer, Format } from '@/common/api-types'
import type * as React from 'react'

import { Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { scroll, animate } from 'motion'
import { useRef } from 'react'

import { usesResultsApi } from '@/common/api-types'
import Layout from '@/components/layout'
import { useIsomorphicEffect } from '@/hooks/use-isomorphic-layout-effect'
import UserIcon from '@/components/user-icon'
import { formatErrors } from '@/env/client.mjs'

interface FontUseProps {
  useIndex: number
  fontFamilies: Array<FontFamily>
  thumb: string
  contributor: Contributor
  tags?: Array<Tag>
  designers?: Array<Designer>
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
    <>
      {uses?.uses.map(({ font_families, thumb, contributor, tags, designers }, useIndex) => (
        <FontUseUnit
          fontFamilies={font_families}
          thumb={thumb}
          useIndex={useIndex}
          key={useIndex}
          contributor={contributor}
          tags={tags}
          designers={designers}
        />
      ))}
    </>
  )
}

const FontUseUnit: React.FC<FontUseProps> = ({ useIndex, fontFamilies, thumb, contributor, designers, tags }) => {
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
      <div className='relative'>
        <img
          className='group-hover:opacity-2 flex-grow-1 min-h-full min-w-full object-cover opacity-100 transition-all'
          src={thumb}
          loading='lazy'
          alt={`Design featuring ${fontFamilies[0]?.name || 'an unidentified font'}`}
        />
        <div className='absolute top-0 left-0 z-20 h-1/3 w-full bg-gradient-to-b from-gray-700 p-2 text-xs uppercase'>
          {designers?.length && (
            <DesignerDisplay designer={designers[0] as Designer} numberOfDesigners={designers.length} />
          )}
        </div>
      </div>
      <div className='flew-wrap absolute bottom-0 left-0 flex w-full gap-2 p-2'>
        {tags && tags.length && <LinkButton url={tags[0]?.permalink || ''} text={tags[0]?.tag || ''} />}
      </div>
    </div>
  )
}

const ContributorDisplay: React.FC<{ contributor: Contributor }> = ({ contributor }) => {
  return (
    <div className='group group flex flex-grow-0 items-center gap-2'>
      <UserIcon />
      <button className='uppercase text-white shadow-2xl hover:bg-black'>
        <a href={contributor.permalink} rel='noreferrer' target='_blank'>
          {contributor.pretty_name || contributor.username}
        </a>
      </button>
    </div>
  )
}

const DesignerDisplay: React.FC<{ designer: Designer; numberOfDesigners: number }> = ({
  designer,
  numberOfDesigners,
}) => {
  return (
    <div className='group group flex flex-grow-0 items-center gap-2'>
      <UserIcon />
      <button className='text-white shadow-2xl hover:bg-black'>
        <a href={designer.permalink} rel='noreferrer' target='_blank'>
          {designer.name} {numberOfDesigners > 1 && `+ ${numberOfDesigners} more`}
        </a>
      </button>
    </div>
  )
}

const LinkButton: React.FC<{ url: string; text: string }> = ({ url, text }) => {
  return (
    <button className='rounded-full border border-black bg-white p-1 text-xs shadow-2xl'>
      <a href={url} rel='noreferrer' target='_blank'>
        {text}
      </a>
    </button>
  )
}
export default UsesResults
