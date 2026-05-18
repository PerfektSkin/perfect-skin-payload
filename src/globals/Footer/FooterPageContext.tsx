'use client'

import type { Page } from '@/payload-types'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type FooterPageData = {
  showFooterContactForm?: Page['showFooterContactForm']
  footerForm?: Page['footerForm']
  footerFormTitle?: Page['footerFormTitle']
  footerFormSubtitle?: Page['footerFormSubtitle']
  isPostPage?: boolean
}

type FooterPageContextType = {
  pageData: FooterPageData | null
  setPageData: (data: FooterPageData | null) => void
}

const FooterPageContext = createContext<FooterPageContextType | null>(null)

export function FooterPageProvider({ children }: { children: React.ReactNode }) {
  const [pageData, setPageDataState] = useState<FooterPageData | null>(null)
  const setPageData = useCallback((data: FooterPageData | null) => {
    setPageDataState(data)
  }, [])

  const value = useMemo(() => ({ pageData, setPageData }), [pageData, setPageData])

  return <FooterPageContext.Provider value={value}>{children}</FooterPageContext.Provider>
}

export function useFooterPage() {
  const context = useContext(FooterPageContext)
  if (!context) {
    throw new Error('useFooterPage must be used within FooterPageProvider')
  }
  return context
}
