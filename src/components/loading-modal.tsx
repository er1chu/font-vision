const LoadingModal: React.FC<{ visibility: boolean }> = ({ visibility = false }) => {
  return (
    <div
      style={{ opacity: visibility ? 50 : 0 }}
      className='pointer-events-none fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center transition-[all]'>
      <div className='rounded-full border border-white bg-background px-20 py-10 text-xl text-main'>
        Fetching more fonts...
      </div>
    </div>
  )
}

export default LoadingModal
