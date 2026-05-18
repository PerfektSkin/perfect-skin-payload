'use client'
import React, { useState } from 'react'

import { ClickToPlayVideo } from '@/components/ClickToPlayVideo'
import type { Media, Page } from '@/payload-types'
import { resolveVideoPosterUrl } from '@/utilities/getMediaPosterURL'

type Props = Extract<Page['layout'][0], { blockType: 'followUs' }> & {
  id?: string
}

export const FollowUsBlock: React.FC<Props> = (props) => {
  const { title, posts } = props
  const [activePostKey, setActivePostKey] = useState<string | null>(null)

  if (!posts || posts.length === 0) return null

  return (
    <section className="md:pt-12">
      <div className="container">
        <h2 className="mb-8 md:mb-10 text-center text-2xl md:text-3xl lg:text-5xl font-medium font-urbanist text-[#2C2C2C]">
          {title}
        </h2>
      </div>

      <div className="container">
        <div className="flex md:grid gap-3 md:gap-4 overflow-x-auto md:overflow-visible scrollbar-hide px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory md:snap-none grid-cols-2 lg:grid-cols-4">
          {posts.map((post, index) => (
            <PostCard
              key={post.id || index}
              post={post}
              postKey={String(post.id ?? index)}
              activePostKey={activePostKey}
              setActivePostKey={setActivePostKey}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type PostCardProps = {
  post: NonNullable<Props['posts']>[number]
  postKey: string
  activePostKey: string | null
  setActivePostKey: React.Dispatch<React.SetStateAction<string | null>>
}

const PostCard: React.FC<PostCardProps> = ({ post, postKey, activePostKey, setActivePostKey }) => {
  const media =
    post.video && typeof post.video === 'object' ? (post.video as Media) : null
  const cover = post.cover && typeof post.cover === 'object' ? post.cover : null
  const videoUrl = media?.url ?? null

  if (!videoUrl) return null

  const forcePause = activePostKey !== null && activePostKey !== postKey

  return (
    <div className="shrink-0 w-[65vw] md:w-auto snap-center">
      <ClickToPlayVideo
        videoUrl={videoUrl}
        posterUrl={resolveVideoPosterUrl({ cover, video: media })}
        posterAlt={cover?.alt ?? media?.alt ?? ''}
        wrapperClassName="aspect-3/4"
        showMuteButton
        forcePause={forcePause}
        onBeforePlay={() => setActivePostKey(postKey)}
        onPause={() => setActivePostKey(null)}
      />
    </div>
  )
}
