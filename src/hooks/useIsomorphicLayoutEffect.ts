import { useEffect, useLayoutEffect } from 'react'

// useLayoutEffect is not available on the server, so we need a hook to check if we are on the server
// or not and to use useEffect on the server and useLayoutEffect on the client.

export const useIsomorphicEffect = () => {
  return typeof window !== 'undefined' ? useLayoutEffect : useEffect
}
