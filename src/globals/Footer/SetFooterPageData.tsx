'use client'

import { useEffect } from 'react'
import type { FooterPageData } from './FooterPageContext'
import { useFooterPage } from './FooterPageContext'

export function SetFooterPageData({ data }: { data: FooterPageData }) {
  const { setPageData } = useFooterPage()

  useEffect(() => {
    setPageData(data)
    return () => setPageData(null)
  }, [
    data.showFooterContactForm,
    data.footerForm,
    data.footerFormTitle,
    data.footerFormSubtitle,
    data.isPostPage,
    setPageData,
  ])

  return null
}
