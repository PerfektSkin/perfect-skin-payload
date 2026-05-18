import type { Page } from '@/payload-types'
import type { FooterPageData } from '@/globals/Footer/FooterPageContext'

export function getFooterPageDataFromPage(page: Page): FooterPageData {
  return {
    showFooterContactForm: page.showFooterContactForm,
    footerForm: page.footerForm,
    footerFormTitle: page.footerFormTitle,
    footerFormSubtitle: page.footerFormSubtitle,
  }
}

export const footerPageDataForPost: FooterPageData = { isPostPage: true }
