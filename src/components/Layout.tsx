import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Masthead from './Masthead'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { animate, scroll } from 'motion'

const queryClient = new QueryClient()

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)), // https://easings.net
      smooth: true,
      direction: 'vertical',
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full bg-gray-200'>
        <Header />
        <div className='sticky top-0 z-50 min-h-[50px] w-full border-b-[2px] border-black bg-orange-100'></div>
        <div className='max-w-screen grid grid-cols-2 gap-[2px] bg-black md:grid-cols-5'>{children}</div>
      </div>
    </QueryClientProvider>
  )
}

const Header: React.FC = () => {
  return (
    <header className='relative grid grid-cols-5 gap-[2px] bg-black pb-[2px] text-xs font-medium'>
      <Masthead />
      <div className='col-span-2 w-full bg-white p-2'>Powered by Fonts In Use</div>
    </header>
  )
}
export default Layout
