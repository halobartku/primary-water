import { useState } from 'react'

interface SkipLinkProps {
  targetId: string
  children: React.ReactNode
}

export function SkipLink({ targetId, children }: SkipLinkProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg
        transition-transform duration-200
        ${isFocused ? 'translate-y-0' : '-translate-y-20'}
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
      `}
    >
      {children}
    </a>
  )
}
