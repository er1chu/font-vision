import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full bg-gray-200'>
        <Header />
        <div className='max-w-screen grid grid-cols-5 gap-[2px] bg-black'>{children}</div>
      </div>
    </QueryClientProvider>
  )
}

const Header: React.FC = () => {
  return (
    <header className='relative grid grid-cols-5 gap-px bg-black p-[2px] text-xs font-medium'>
      <img src='/fv.svg' alt='font vision' className='col-span-1 bg-gray-200 p-2' />
      <div className='-full bg-white p-2'>Powered by Fonts In Use</div>
    </header>
  )
}
export default Layout
