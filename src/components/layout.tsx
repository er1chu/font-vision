import type React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Masthead from '@/components/masthead'
import { useIsomorphicEffect } from '@/hooks/use-isomorphic-layout-effect'
import Lenis from '@studio-freight/lenis'

const queryClient = new QueryClient()

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const layoutEffect = useIsomorphicEffect()
  layoutEffect(() => {
    smoothScroll()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full bg-background'>
        <Header />
        <StickyNav />
        <main className='max-w-screen grid grid-cols-2 gap-[2px] bg-black lg:grid-cols-5'>{children}</main>
      </div>
    </QueryClientProvider>
  )
}

const Header: React.FC = () => {
  return (
    <>
      <header className='relative grid grid-cols-5 gap-[2px] bg-main pb-[2px] text-xs font-medium'>
        <Masthead fill={'fill-main'} stroke={'stroke-background'} strokeWidth={'stroke-0'} />
        <div className='relative col-span-2 w-full bg-background p-2'>
          {/* <div className='absolute top-0 left-0 z-[100] -ml-[50px]'>
            <img className='w-[100px]' src='/scrappy.svg' alt='scrappy' />
          </div> */}
        </div>
      </header>
    </>
  )
}

const StickyNav: React.FC = () => {
  return (
    <div className='sticky top-0 z-50 grid min-h-[50px] w-full grid-cols-2 content-center border-b-[2px] border-black bg-accent px-2 text-xs md:grid-cols-5'>
      <div className='flex gap-1'>
        Displaying:
        <div>
          <label htmlFor='default-checkbox' className='mr-2'>
            Images
          </label>
          <input
            id='default-checkbox'
            type='checkbox'
            value=''
            className='border-black bg-orange-100 bg-none accent-pink-500 dark:focus:ring-blue-600'
          />
        </div>
      </div>
    </div>
  )
}

const smoothScroll = (): void => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)), // https://easings.net
    smooth: true,
    direction: 'vertical',
  })
  function raf(time: number): void {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

export default Layout
