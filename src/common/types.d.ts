export * from '@/common/api-types'

export type SVGComponent<T> = T & HTMLAttributes<SVGElement>

export type ArrayofType<T> = T[]

export interface SVGSettings {
  fill?: string
  stroke?: string
  strokeWidth?: number
}
