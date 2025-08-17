'use client'

import { useEffect, useState } from 'react'

type TypingHeadingProps = {
  text: string
  className?: string
  speedMs?: number
}

export default function TypingHeading({ text, className = '', speedMs = 28 }: TypingHeadingProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speedMs)
    return () => clearInterval(id)
  }, [text, speedMs])

  return (
    <h1 className={className} aria-label={text}>
      {displayed}
      <span className="inline-block w-[1ch] ml-1" aria-hidden>
        |
      </span>
    </h1>
  )
}

