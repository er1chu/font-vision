interface DisplayProps {
  useCount?: number
  sampleSrc: string | null
  name: string
}

const DisplayUnit: React.FC<DisplayProps> = ({ useCount, sampleSrc, name }) => {
  return (
    <div className='aspect-[0.8] bg-white text-xs font-medium'>
      {useCount && <div className='px-2 text-right'>{useCount}</div>}
      {sampleSrc && <img src={sampleSrc} alt={name} />}
    </div>
  )
}

export default DisplayUnit
