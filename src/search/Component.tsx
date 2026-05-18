'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [value, setValue] = useState(initialQuery)
  const router = useRouter()
  const t = useTranslations()
  const isFirstRender = useRef(true)

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const nextUrl = debouncedValue ? `/search?q=${encodeURIComponent(debouncedValue)}` : '/search'
    router.replace(nextUrl)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder={t('search')}
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
