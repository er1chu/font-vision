import type { SVGComponent, SVGSettings } from '@/common/types'

function UserIcon({ fill = 'white', stroke = 'black', strokeWidth = 0, ...rest }): SVGComponent<SVGSettings> {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none' viewBox='0 0 10 10' {...rest}>
      <path
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        d='M9.059 8.281a4.715 4.715 0 00-2.621-2.117 2.812 2.812 0 10-2.875 0A4.715 4.715 0 00.94 8.281a.3.3 0 000 .313.305.305 0 00.27.156h7.578a.305.305 0 00.27-.156.3.3 0 000-.313z'></path>
    </svg>
  )
}

export default UserIcon
