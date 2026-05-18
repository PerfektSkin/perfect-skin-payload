'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { FormBlock } from '@/blocks/Form/Component'
import { useFooterPage } from './FooterPageContext'

type FooterWrapperProps = {
  contactForm?: FormType | string | null
  contactFormTitle?: string | null
  contactFormSubtitle?: string | null
  postsContactForm?: FormType | string | null
  postsContactFormTitle?: string | null
  postsContactFormSubtitle?: string | null
}

export function FooterWrapper({
  contactForm,
  contactFormTitle,
  contactFormSubtitle,
  postsContactForm,
  postsContactFormTitle,
  postsContactFormSubtitle,
}: FooterWrapperProps) {
  const { pageData } = useFooterPage()

  const isPostPage = pageData?.isPostPage ?? false
  const showForm = isPostPage || Boolean(pageData?.showFooterContactForm)

  let activeForm: FormType | null | undefined
  let activeTitle: string | null | undefined
  let activeSubtitle: string | null | undefined

  if (isPostPage) {
    activeForm =
      postsContactForm && typeof postsContactForm === 'object'
        ? (postsContactForm as FormType)
        : contactForm && typeof contactForm === 'object'
          ? (contactForm as FormType)
          : null
    activeTitle = postsContactFormTitle || contactFormTitle
    activeSubtitle = postsContactFormSubtitle || contactFormSubtitle
  } else {
    const pageForm =
      pageData?.footerForm && typeof pageData.footerForm === 'object'
        ? (pageData.footerForm as unknown as FormType)
        : null
    activeForm =
      pageForm ||
      (contactForm && typeof contactForm === 'object' ? (contactForm as FormType) : null)
    activeTitle = pageData?.footerFormTitle || contactFormTitle
    activeSubtitle = pageData?.footerFormSubtitle || contactFormSubtitle
  }

  if (!showForm || !activeForm) {
    return null
  }

  return (
    <FormBlock
      form={activeForm}
      enableIntro={false}
      title={activeTitle || undefined}
      subtitle={activeSubtitle || undefined}
    />
  )
}
