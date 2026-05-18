import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { News as NewsType } from '@/payload-types'
import { generateNewsMeta } from '@/utilities/generateNewsMeta'
import { TypedLocale } from 'payload'
import PageClient from './page.client'

export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'news',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return result.docs
    .filter((doc) => doc.slug)
    .map(({ slug }) => ({
      slug,
    }))
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: TypedLocale
  }>
}

export default async function NewsPage({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'ro' } = await paramsPromise
  const url = '/news/' + slug
  const newsItem = await queryNews({ slug, locale })

  if (!newsItem) return <PayloadRedirects url={url} />

  const image = newsItem.image && typeof newsItem.image === 'object' ? newsItem.image : null

  return (
    <article className="pb-16 pt-16 md:pt-16">
      <PageClient />

      <div className="container">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {image && (
            <div className="relative w-full aspect-16/10 overflow-hidden rounded-2xl bg-[#F0F0F0]">
              <Media resource={image} fill imgClassName="object-cover" priority />
            </div>
          )}

          <header className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-urbanist text-[#2C2C2C]">
              {newsItem.title}
            </h1>
            {newsItem.shortDescription && (
              <p className="text-lg text-[#5A5A5A] font-work-sans leading-relaxed">
                {newsItem.shortDescription}
              </p>
            )}
          </header>
        </div>
      </div>

      {newsItem.layout && newsItem.layout.length > 0 && (
        <RenderBlocks blocks={newsItem.layout as Page['layout']} locale={locale} />
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'ro' } = await paramsPromise
  const newsItem = await queryNews({ slug, locale })

  return generateNewsMeta(newsItem)
}

const queryNews = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
    depth: 2,
    limit: 1,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as NewsType) || null
})
