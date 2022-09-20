import type { FontFamily, Contributor, Tag, Designer } from '@/common/api-types'

import { useRef } from 'react'
import { useIsomorphicEffect } from '@/hooks/use-isomorphic-layout-effect'
import { scroll, animate } from 'motion'
import UserIcon from '@/components/user-icon'
import Img from 'react-cool-img'

interface FontUseProps {
  fontFamilies: Array<FontFamily>
  thumb: string
  contributor: Contributor
  tags?: Array<Tag>
  designers?: Array<Designer>
  onClick?: () => void
}

const FontUseUnit: React.FC<FontUseProps> = ({ fontFamilies, thumb, contributor, designers, tags, onClick }) => {
  const animationRef = useRef<Element>(null) as React.MutableRefObject<Element>
  const layoutEffect = useIsomorphicEffect()
  layoutEffect(() => {
    //scroll-based animation, perf issues
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
  }, [])
  return (
    <div
      onClick={onClick}
      ref={animationRef as React.RefObject<HTMLDivElement>}
      className='family-unit group flex aspect-[0.8] flex-col overflow-hidden rounded-lg odd:bg-secondary even:bg-primary hover:cursor-pointer'>
      <div className=''>
        {fontFamilies.slice(0, 3).map(({ name, sample_src, use_count }, fontIndex) => (
          <div className='border-b-[1px] border-black even:bg-[#ffffff]' key={fontIndex}>
            <Img debounce={0} className='max-w-full' src={sample_src} alt={name} />
          </div>
        ))}
      </div>
      <div className='relative bg-gradient-to-b from-background to-accent opacity-100'>
        <Img
          className='flex-grow-1 min-h-full min-w-full object-cover mix-blend-multiply transition-all hover:mix-blend-normal hover:grayscale-0'
          src={thumb}
          debounce={450}
          width={220}
          height={220}
          alt={`Design featuring ${fontFamilies[0]?.name || 'an unidentified font'}`}
        />
        <div className='absolute top-0 left-0 z-20 h-1/3 w-full bg-gradient-to-b from-black p-2 text-xs uppercase'>
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
    <button className='rounded-full border border-black bg-background p-1 text-xs shadow-2xl'>
      <a href={url} rel='noreferrer' target='_blank'>
        {text}
      </a>
    </button>
  )
}

const ContributorDisplay: React.FC<{ contributor: Contributor }> = ({ contributor }) => {
  const { pretty_name, permalink, username } = contributor
  return (
    <div className='group group flex flex-grow-0 items-center gap-2'>
      <UserIcon />
      <button className='uppercase text-white shadow-2xl hover:bg-black'>
        <a href={permalink} rel='noreferrer' target='_blank'>
          {pretty_name || username}
        </a>
      </button>
    </div>
  )
}
export default FontUseUnit
