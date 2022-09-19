const LoadingScreen: React.FC<{ unitCount: number }> = ({ unitCount = 10 }) => {
  return (
    <>
      {Array.from({ length: unitCount }).map((_, index) => (
        <PlaceholderUnit key={index} />
      ))}
    </>
  )
}

const PlaceholderUnit = () => {
  return (
    <div className='flex aspect-[0.8] animate-pulse items-center justify-center overflow-hidden rounded-lg text-lg odd:bg-secondary even:bg-primary'>
      <div className='animate-bounce'>Loading font...</div>
    </div>
  )
}

export default LoadingScreen
